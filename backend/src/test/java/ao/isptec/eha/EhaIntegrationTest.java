package ao.isptec.eha;

import ao.isptec.eha.model.User;
import ao.isptec.eha.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class EhaIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    // ---------- Autenticação e verificação de email ----------

    @Test
    @Order(1)
    void registerCreatesUnverifiedUserAndVerificationWorks() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Teste Estudante","email":"teste@eha.ao","password":"Password123!"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.userId").isNumber());

        // Login bloqueado enquanto o email não for verificado
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"teste@eha.ao","password":"Password123!"}
                                """))
                .andExpect(status().isUnauthorized());

        // Código errado é rejeitado
        mockMvc.perform(post("/api/auth/verify-email")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"teste@eha.ao","code":"000000x"}
                                """))
                .andExpect(status().isBadRequest());

        // Verificar com o código real (em produção chega por email)
        User user = userRepository.findByEmail("teste@eha.ao").orElseThrow();
        mockMvc.perform(post("/api/auth/verify-email")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"teste@eha.ao\",\"code\":\""
                                + user.getVerificationCode() + "\"}"))
                .andExpect(status().isOk());

        // Depois de verificado, o login funciona
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"teste@eha.ao","password":"Password123!"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    @Order(2)
    void registerDuplicateEmailFails() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Outro Nome","email":"joao@example.com","password":"Password123!"}
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Order(3)
    void loginReturnsTokenAndUser() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"joao@example.com","password":"Password123!"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.refreshToken").isNotEmpty())
                .andExpect(jsonPath("$.user.name").value("João Silva"));
    }

    @Test
    @Order(4)
    void loginWrongPasswordFails() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"joao@example.com","password":"errada"}
                                """))
                .andExpect(status().isUnauthorized());
    }

    // ---------- Conteúdos ----------

    @Test
    @Order(5)
    void listContentsIsPublicAndSeeded() throws Exception {
        mockMvc.perform(get("/api/contents"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(6))
                .andExpect(jsonPath("$.content[0].title").isNotEmpty());
    }

    @Test
    @Order(6)
    void contentDetailIncrementsViews() throws Exception {
        MvcResult first = mockMvc.perform(get("/api/contents/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isNotEmpty())
                .andReturn();
        long views = objectMapper.readTree(first.getResponse().getContentAsString())
                .get("views").asLong();

        mockMvc.perform(get("/api/contents/1"))
                .andExpect(jsonPath("$.views").value(views + 1));
    }

    @Test
    @Order(7)
    void contentSearchFilters() throws Exception {
        mockMvc.perform(get("/api/contents").param("search", "kwanza"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    // ---------- Quizzes ----------

    @Test
    @Order(8)
    void quizDetailHidesCorrectAnswers() throws Exception {
        mockMvc.perform(get("/api/quizzes/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questions").isArray())
                .andExpect(jsonPath("$.questions[0].options[0].correct").doesNotExist());
    }

    @Test
    @Order(9)
    void quizSubmitRequiresAuth() throws Exception {
        mockMvc.perform(post("/api/quizzes/1/submit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"answers":[{"questionId":1,"selectedOptionId":1}],"timeSpent":30}
                                """))
                .andExpect(status().isForbidden());
    }

    @Test
    @Order(10)
    void quizSubmitGradesAndAwardsPoints() throws Exception {
        String token = loginAndGetToken("teste@eha.ao");

        // Obter o quiz 2 (Kwanza) e responder tudo corretamente:
        // as respostas corretas são conhecidas do seed
        MvcResult quizResult = mockMvc.perform(get("/api/quizzes/2"))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode quiz = objectMapper.readTree(quizResult.getResponse().getContentAsString());
        JsonNode questions = quiz.get("questions");

        // Índices das opções corretas do Quiz 2, pela ordem do seed
        int[] correctIndexes = {0, 1, 0, 1, 2};
        StringBuilder answers = new StringBuilder("[");
        for (int i = 0; i < questions.size(); i++) {
            JsonNode q = questions.get(i);
            long optionId = q.get("options").get(correctIndexes[i]).get("id").asLong();
            if (i > 0) answers.append(",");
            answers.append("{\"questionId\":").append(q.get("id").asLong())
                    .append(",\"selectedOptionId\":").append(optionId).append("}");
        }
        answers.append("]");

        mockMvc.perform(post("/api/quizzes/2/submit")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"answers\":" + answers + ",\"timeSpent\":120}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.score").value(100))
                .andExpect(jsonPath("$.correctAnswers").value(5))
                .andExpect(jsonPath("$.pointsEarned").value(10))
                .andExpect(jsonPath("$.passed").value(true));

        // Pontos refletidos no perfil
        mockMvc.perform(get("/api/users/me").header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.points").value(10));

        // Badge "Primeiro Passo" atribuído
        mockMvc.perform(get("/api/badges").header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$[0].earned").value(true));

        // Histórico regista a tentativa
        mockMvc.perform(get("/api/quizzes/history").header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.attempts[0].quizId").value(2));
    }

    // ---------- Ranking ----------

    @Test
    @Order(11)
    void rankingOrderedByPoints() throws Exception {
        mockMvc.perform(get("/api/ranking/global"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rankings[0].userName").value("Maria Santos"))
                .andExpect(jsonPath("$.rankings[0].position").value(1));
    }

    // ---------- Fórum ----------

    @Test
    @Order(12)
    void forumTopicsListedAndDetailWithReplies() throws Exception {
        mockMvc.perform(get("/api/forum/topics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.topics.length()").value(3));

        mockMvc.perform(get("/api/forum/topics/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.replies.length()").value(3));
    }

    @Test
    @Order(13)
    void forumCreateTopicAndReply() throws Exception {
        String token = loginAndGetToken("joao@example.com");

        MvcResult created = mockMvc.perform(post("/api/forum/topics")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":"Futuro dos diamantes","content":"Qual o papel da Endiama na próxima década?","category":"Comércio"}
                                """))
                .andExpect(status().isCreated())
                .andReturn();
        long topicId = objectMapper.readTree(created.getResponse().getContentAsString())
                .get("id").asLong();

        mockMvc.perform(post("/api/forum/topics/" + topicId + "/replies")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"content":"Boa pergunta, acho que a lapidação local é o caminho."}
                                """))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/forum/topics/" + topicId))
                .andExpect(jsonPath("$.replies.length()").value(1));
    }

    // ---------- Perfil ----------

    @Test
    @Order(14)
    void updateProfile() throws Exception {
        String token = loginAndGetToken("teste@eha.ao");
        mockMvc.perform(put("/api/users/me")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Teste Atualizado","bio":"Nova bio"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Teste Atualizado"))
                .andExpect(jsonPath("$.bio").value("Nova bio"));
    }

    // ---------- Recuperação de password ----------

    @Test
    @Order(15)
    void forgotPasswordResetsAndOldPasswordStopsWorking() throws Exception {
        // Pedido de recuperação devolve mensagem genérica
        mockMvc.perform(post("/api/auth/forgot-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"sofia@example.com"}
                                """))
                .andExpect(status().isOk());

        // Código errado é rejeitado
        mockMvc.perform(post("/api/auth/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"sofia@example.com","code":"000000","newPassword":"NovaSenha456!"}
                                """))
                .andExpect(status().isBadRequest());

        // Redefinir com o código real (em produção chega por email)
        String code = userRepository.findByEmail("sofia@example.com").orElseThrow().getResetCode();
        mockMvc.perform(post("/api/auth/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"sofia@example.com\",\"code\":\"" + code
                                + "\",\"newPassword\":\"NovaSenha456!\"}"))
                .andExpect(status().isOk());

        // Password antiga deixa de funcionar
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"sofia@example.com","password":"Password123!"}
                                """))
                .andExpect(status().isUnauthorized());

        // Password nova funciona
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"sofia@example.com","password":"NovaSenha456!"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty());

        // Código não pode ser reutilizado
        mockMvc.perform(post("/api/auth/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"sofia@example.com\",\"code\":\"" + code
                                + "\",\"newPassword\":\"OutraSenha789!\"}"))
                .andExpect(status().isBadRequest());
    }

    private String loginAndGetToken(String email) throws Exception {
        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"Password123!\"}"))
                .andExpect(status().isOk())
                .andReturn();
        return objectMapper.readTree(result.getResponse().getContentAsString())
                .get("token").asText();
    }
}
