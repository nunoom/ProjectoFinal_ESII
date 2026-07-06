package ao.isptec.eha.config;

import ao.isptec.eha.model.*;
import ao.isptec.eha.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

/**
 * Popula a base de dados com dados de demonstração (alinhados com os dados
 * mock do frontend/mobile). Só corre quando a BD está vazia.
 * Password de todos os utilizadores demo: Password123!
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);
    private static final String DEMO_PASSWORD = "Password123!";

    private final UserRepository users;
    private final ContentRepository contents;
    private final QuizRepository quizzes;
    private final ForumTopicRepository topics;
    private final ForumReplyRepository replies;
    private final BadgeRepository badges;
    private final UserBadgeRepository userBadges;
    private final PasswordEncoder encoder;

    public DataSeeder(UserRepository users, ContentRepository contents, QuizRepository quizzes,
                      ForumTopicRepository topics, ForumReplyRepository replies,
                      BadgeRepository badges, UserBadgeRepository userBadges,
                      PasswordEncoder encoder) {
        this.users = users;
        this.contents = contents;
        this.quizzes = quizzes;
        this.topics = topics;
        this.replies = replies;
        this.badges = badges;
        this.userBadges = userBadges;
        this.encoder = encoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (users.count() > 0) {
            log.info("Base de dados já populada — seed ignorado");
            return;
        }
        log.info("A popular base de dados com dados de demonstração...");

        seedBadges();
        List<User> demoUsers = seedUsers();
        seedContents();
        seedQuizzes();
        seedForum(demoUsers);

        log.info("Seed concluído: {} utilizadores, {} conteúdos, {} quizzes, {} tópicos",
                users.count(), contents.count(), quizzes.count(), topics.count());
    }

    // O campo icon guarda um slug de ícone; os clientes mapeiam para
    // lucide (web) ou Ionicons (mobile)
    private void seedBadges() {
        badges.saveAll(List.of(
                new Badge("Primeiro Passo", "Complete seu primeiro quiz", "target"),
                new Badge("Estudante Dedicado", "Complete 10 quizzes", "book-open"),
                new Badge("Iniciante", "Alcance 100 pontos", "star"),
                new Badge("Intermediário", "Alcance 500 pontos", "award"),
                new Badge("Leitor Ávido", "Leia 20 conteúdos", "library"),
                new Badge("Participante Ativo", "Crie 10 posts no fórum", "message-circle")));
    }

    private List<User> seedUsers() {
        String hash = encoder.encode(DEMO_PASSWORD);

        User admin = user("Administrador EHA", "admin@eha.ao", hash, 0);
        admin.setRole(User.Role.ADMIN);

        User maria = user("Maria Santos", "maria@example.com", hash, 1250);
        User pedro = user("Pedro Costa", "pedro@example.com", hash, 980);
        User ana = user("Ana Ferreira", "ana@example.com", hash, 875);
        User carlos = user("Carlos Mendes", "carlos@example.com", hash, 720);
        User sofia = user("Sofia Alves", "sofia@example.com", hash, 650);
        User joao = user("João Silva", "joao@example.com", hash, 350);
        joao.setBio("Estudante de economia apaixonado pela história de Angola");

        List<User> saved = users.saveAll(List.of(admin, maria, pedro, ana, carlos, sofia, joao));

        // João já conquistou 2 badges (como nos dados mock)
        badges.findById(1L).ifPresent(b -> userBadges.save(new UserBadge(joao, b)));
        badges.findById(3L).ifPresent(b -> userBadges.save(new UserBadge(joao, b)));

        return saved;
    }

    private User user(String name, String email, String hash, int points) {
        User u = new User(name, email, hash);
        u.setPhotoUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=" + name.split(" ")[0]);
        u.setPoints(points);
        u.setLevel(points / 100 + 1);
        u.setEmailVerified(true); // utilizadores de demonstração já verificados
        return u;
    }

    private void seedContents() {
        content("História do Petróleo em Angola",
                "Descubra como o petróleo moldou a economia angolana desde a sua descoberta",
                "Petróleo", 10, 1523,
                "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800");
        content("A Evolução do Kwanza",
                "A história da moeda nacional angolana e suas reformas monetárias",
                "Kwanza", 8, 987,
                "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800");
        content("Impacto Económico da Guerra Civil",
                "Como a guerra civil afetou a economia angolana e o processo de reconstrução",
                "Guerra Civil", 15, 2341,
                "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800");
        content("Agricultura em Angola",
                "O potencial agrícola de Angola e os desafios do setor",
                "Agricultura", 12, 756,
                "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800");
        content("Reformas Económicas Pós-Independência",
                "As principais reformas económicas implementadas após a independência",
                "Reformas", 11, 1234,
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800");
        content("Comércio Internacional de Angola",
                "Principais parceiros comerciais e produtos de exportação",
                "Comércio", 9, 892,
                "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800");
    }

    private void content(String title, String summary, String category, int readTime,
                         long views, String imageUrl) {
        Content c = new Content();
        c.setTitle(title);
        c.setSummary(summary);
        c.setCategory(category);
        c.setReadTime(readTime);
        c.setViews(views);
        c.setImageUrl(imageUrl);
        c.setBody("""
                <h2>Introdução</h2>
                <p>%s. Este artigo explora em profundidade os aspectos históricos e económicos
                relacionados com este tema fundamental para compreender a economia angolana.</p>
                <h2>Contexto Histórico</h2>
                <p>A história económica de Angola é marcada por diversos períodos de transformação.
                Desde o período colonial até à independência em 1975, o país passou por mudanças
                significativas que moldaram a sua estrutura económica atual.</p>
                <h2>Desenvolvimento Económico</h2>
                <p>Após a independência, Angola enfrentou um longo período de guerra civil que durou
                até 2002. Com o fim da guerra, o país iniciou um processo de reconstrução e
                desenvolvimento económico acelerado.</p>
                <h2>Desafios Atuais</h2>
                <ul>
                <li>Diversificação da economia para reduzir a dependência do petróleo</li>
                <li>Desenvolvimento de infraestruturas básicas</li>
                <li>Melhoria do sistema educativo</li>
                <li>Criação de emprego para a população jovem</li>
                </ul>
                <h2>Conclusão</h2>
                <p>Compreender a história económica de Angola é essencial para entender os desafios
                e oportunidades que o país enfrenta atualmente.</p>
                """.formatted(summary));
        c.setCreatedAt(Instant.parse("2026-04-15T10:00:00Z"));
        contents.save(c);
    }

    private void seedQuizzes() {
        Quiz q1 = quiz("Quiz: Petróleo em Angola",
                "Teste seus conhecimentos sobre a história do petróleo angolano",
                "Petróleo", Quiz.Difficulty.MEDIUM, 25, 360);
        mc(q1, "Em que década começou a produção comercial de petróleo em Angola?",
                "A primeira descoberta comercial ocorreu em 1955, na bacia do Kwanza.",
                new String[]{"Década de 1930", "Década de 1950", "Década de 1970", "Década de 1990"}, 1);
        mc(q1, "Qual é a empresa estatal angolana responsável pelo setor petrolífero?",
                "A Sonangol foi fundada em 1976, um ano após a independência.",
                new String[]{"Endiama", "TAAG", "Sonangol", "Unitel"}, 2);
        tf(q1, "O petróleo representa a maior parte das exportações de Angola.",
                "O petróleo representa cerca de 90% das receitas de exportação do país.", true);
        mc(q1, "Qual província é historicamente conhecida como grande zona de produção petrolífera offshore?",
                "Cabinda concentra grande parte da produção offshore desde os anos 1960.",
                new String[]{"Huambo", "Cabinda", "Cunene", "Moxico"}, 1);
        mc(q1, "Em que ano Angola aderiu à OPEP?",
                "Angola tornou-se membro da OPEP em 2007.",
                new String[]{"1996", "2001", "2007", "2015"}, 2);
        mc(q1, "Qual tem sido o principal destino das exportações de petróleo angolano?",
                "A China é o maior comprador do petróleo angolano desde meados dos anos 2000.",
                new String[]{"Estados Unidos", "Portugal", "Brasil", "China"}, 3);
        quizzes.save(q1);

        Quiz q2 = quiz("Quiz: Moeda Nacional", "Quanto você sabe sobre o Kwanza?",
                "Kwanza", Quiz.Difficulty.EASY, 10, 300);
        mc(q2, "Qual é a moeda oficial de Angola?",
                "O Kwanza (AOA) é a moeda oficial de Angola.",
                new String[]{"Kwanza", "Metical", "Escudo", "Rand"}, 0);
        mc(q2, "Em que ano o Kwanza substituiu o escudo angolano?",
                "O Kwanza foi introduzido em 1977, dois anos após a independência.",
                new String[]{"1975", "1977", "1985", "1999"}, 1);
        tf(q2, "O nome \"Kwanza\" tem origem num rio angolano.",
                "O nome vem do rio Kwanza (Cuanza), um dos maiores rios de Angola.", true);
        mc(q2, "Que instituição é responsável pela emissão do Kwanza?",
                "O Banco Nacional de Angola (BNA) é o banco central e emissor da moeda.",
                new String[]{"Ministério das Finanças", "Banco Nacional de Angola", "Sonangol", "Banco Mundial"}, 1);
        mc(q2, "Que moeda circulava em Angola antes da independência?",
                "Durante o período colonial circulava o escudo angolano.",
                new String[]{"Peseta", "Franco CFA", "Escudo angolano", "Libra esterlina"}, 2);
        quizzes.save(q2);

        Quiz q3 = quiz("Quiz: Guerra Civil e Economia", "Impactos económicos do conflito armado",
                "Guerra Civil", Quiz.Difficulty.HARD, 50, 480);
        mc(q3, "Em que período decorreu a guerra civil angolana?",
                "O conflito começou logo após a independência em 1975 e terminou em 2002.",
                new String[]{"1961–1974", "1975–2002", "1980–1995", "1992–2010"}, 1);
        tf(q3, "A guerra civil destruiu grande parte das infraestruturas rurais e da rede ferroviária.",
                "Pontes, estradas e caminhos-de-ferro (como o de Benguela) ficaram gravemente danificados.", true);
        mc(q3, "Qual setor manteve produção significativa durante a guerra, por operar offshore?",
                "As plataformas offshore ficaram relativamente protegidas do conflito terrestre.",
                new String[]{"Agricultura", "Indústria têxtil", "Petróleo", "Turismo"}, 2);
        mc(q3, "Que recurso natural financiou em grande parte a UNITA durante o conflito?",
                "Os chamados \"diamantes de conflito\" das Lundas financiaram o esforço de guerra.",
                new String[]{"Diamantes", "Ouro", "Café", "Madeira"}, 0);
        mc(q3, "Qual foi um dos principais efeitos económicos do fim da guerra em 2002?",
                "Entre 2002 e 2008, Angola registou das maiores taxas de crescimento do mundo.",
                new String[]{"Queda imediata do PIB", "Boom de reconstrução e forte crescimento do PIB",
                        "Abandono do setor petrolífero", "Fim das importações"}, 1);
        mc(q3, "O programa de reconstrução pós-guerra contou com linhas de crédito de que país?",
                "As linhas de crédito chinesas, garantidas por petróleo, financiaram a reconstrução.",
                new String[]{"França", "Rússia", "China", "África do Sul"}, 2);
        quizzes.save(q3);

        Quiz q4 = quiz("Quiz: Setor Agrícola", "Teste seus conhecimentos sobre agricultura angolana",
                "Agricultura", Quiz.Difficulty.MEDIUM, 25, 300);
        mc(q4, "Antes da independência, Angola era um dos maiores exportadores mundiais de que produto?",
                "Nos anos 1970, Angola chegou a ser o 4.º maior exportador mundial de café.",
                new String[]{"Cacau", "Café", "Chá", "Arroz"}, 1);
        mc(q4, "Qual região angolana tem maior potencial agrícola?",
                "O Planalto Central tem clima ameno e solos favoráveis à agricultura.",
                new String[]{"Deserto do Namibe", "Planalto Central (Huambo e Bié)",
                        "Litoral de Luanda", "Enclave de Cabinda"}, 1);
        tf(q4, "Atualmente, Angola importa grande parte dos alimentos que consome.",
                "Apesar do potencial agrícola, o país depende fortemente de importações alimentares.", true);
        mc(q4, "Qual destas culturas é a base alimentar em grande parte do país?",
                "A mandioca é a cultura alimentar mais consumida, sobretudo no norte.",
                new String[]{"Trigo", "Cevada", "Mandioca", "Aveia"}, 2);
        mc(q4, "Que fator dificultou a recuperação agrícola após a guerra civil?",
                "As minas terrestres e a destruição de estradas dificultaram o regresso à produção.",
                new String[]{"Excesso de chuva", "Minas terrestres e falta de infraestruturas",
                        "Falta de terras aráveis", "Proibição de exportações"}, 1);
        quizzes.save(q4);
    }

    private Quiz quiz(String title, String description, String category,
                      Quiz.Difficulty difficulty, int points, int timeLimit) {
        Quiz q = new Quiz();
        q.setTitle(title);
        q.setDescription(description);
        q.setCategory(category);
        q.setDifficulty(difficulty);
        q.setPoints(points);
        q.setTimeLimit(timeLimit);
        return q;
    }

    private void mc(Quiz quiz, String text, String explanation, String[] options, int correctIndex) {
        addQuestion(quiz, Question.Type.MULTIPLE_CHOICE, text, explanation, options, correctIndex);
    }

    private void tf(Quiz quiz, String text, String explanation, boolean answer) {
        addQuestion(quiz, Question.Type.TRUE_FALSE, text, explanation,
                new String[]{"Verdadeiro", "Falso"}, answer ? 0 : 1);
    }

    private void addQuestion(Quiz quiz, Question.Type type, String text, String explanation,
                             String[] options, int correctIndex) {
        Question question = new Question();
        question.setQuiz(quiz);
        question.setType(type);
        question.setText(text);
        question.setExplanation(explanation);
        for (int i = 0; i < options.length; i++) {
            question.getOptions().add(new QuestionOption(question, options[i], i == correctIndex));
        }
        quiz.getQuestions().add(question);
    }

    private void seedForum(List<User> demoUsers) {
        User maria = demoUsers.get(1);
        User pedro = demoUsers.get(2);
        User ana = demoUsers.get(3);
        User carlos = demoUsers.get(4);
        User joao = demoUsers.get(6);

        ForumTopic t1 = topic(maria, "Impacto do petróleo na economia atual", "Petróleo",
                "Angola continua muito dependente do petróleo. Que estratégias acham mais realistas "
                        + "para diversificar a economia nos próximos 10 anos?", 234);
        reply(t1, pedro, "Acho que a aposta deve ser na agricultura e na agroindústria. O país tem "
                + "terra, água e mão de obra jovem — falta crédito acessível e estradas.");
        reply(t1, ana, "Concordo, mas acrescentaria o turismo. Angola tem um potencial enorme "
                + "(Kalandula, Namibe, Cabo Ledo) e o setor cria muitos empregos diretos.");
        reply(t1, joao, "Não esquecer a educação: sem capital humano qualificado, nenhum setor "
                + "consegue crescer de forma sustentável.");

        ForumTopic t2 = topic(pedro, "Discussão sobre reformas monetárias", "Kwanza",
                "Desde 1977, o Kwanza passou por várias reformas. Qual foi, na vossa opinião, "
                        + "a reforma com maior impacto na estabilidade dos preços?", 156);
        reply(t2, maria, "O Kwanza Reajustado de 1995 foi a reforma mais dura, mas a redenominação "
                + "de 1999 é que trouxe alguma estabilidade, na minha opinião.");

        ForumTopic t3 = topic(ana, "Potencial agrícola de Angola", "Agricultura",
                "Angola já foi um grande exportador de café e algodão. O que falta para o setor "
                        + "agrícola voltar a ser um motor da economia?", 412);
        reply(t3, carlos, "O maior problema é o escoamento: sem estradas e cadeias de frio, "
                + "a produção apodrece antes de chegar aos mercados urbanos.");
    }

    private ForumTopic topic(User author, String title, String category, String content, long views) {
        ForumTopic t = new ForumTopic();
        t.setAuthor(author);
        t.setTitle(title);
        t.setCategory(category);
        t.setContent(content);
        t.setViews(views);
        return topics.save(t);
    }

    private void reply(ForumTopic topic, User author, String content) {
        ForumReply r = new ForumReply();
        r.setTopic(topic);
        r.setAuthor(author);
        r.setContent(content);
        replies.save(r);
    }
}
