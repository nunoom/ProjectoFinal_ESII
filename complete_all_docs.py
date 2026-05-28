#!/usr/bin/env python3
"""
Script para completar TODOS os documentos do projeto EHA
"""

import os

def write_file(path, content):
    """Escreve conteúdo em arquivo"""
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Completado: {path}")

# Base path
base = "docs"

# ============================================
# BACKEND
# ============================================

backend_arquitetura = """# Arquitetura Backend - Spring Boot

## 1. Visão Geral

O backend do EHA é construído com **Spring Boot 3.x**, seguindo uma arquitetura em camadas (Layered Architecture) com separação clara de responsabilidades.

### 1.1 Stack Tecnológica

- **Framework**: Spring Boot 3.2.x
- **Linguagem**: Java 17
- **Build Tool**: Maven
- **Database**: PostgreSQL 15
- **ORM**: Spring Data JPA / Hibernate
- **Segurança**: Spring Security + JWT
- **Validação**: Spring Validation
- **Documentação**: SpringDoc OpenAPI (Swagger)
- **Testes**: JUnit 5, Mockito, Spring Boot Test

## 2. Arquitetura em Camadas

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│    (Controllers / REST Endpoints)       │
├─────────────────────────────────────────┤
│         SERVICE LAYER                   │
│    (Business Logic / Transactions)      │
├─────────────────────────────────────────┤
│         PERSISTENCE LAYER               │
│    (Repositories / Data Access)         │
├─────────────────────────────────────────┤
│         DATABASE LAYER                  │
│         (PostgreSQL)                    │
└─────────────────────────────────────────┘
```

### 2.1 Presentation Layer (Controllers)

**Responsabilidades**:
- Receber requisições HTTP
- Validar dados de entrada
- Chamar serviços apropriados
- Retornar respostas HTTP

**Exemplo**:
```java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
```

### 2.2 Service Layer

**Responsabilidades**:
- Implementar lógica de negócio
- Gerenciar transações
- Validar regras de negócio
- Coordenar múltiplos repositórios

**Exemplo**:
```java
@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }
        
        String token = jwtTokenProvider.generateToken(user);
        return new LoginResponse(token, user);
    }
}
```

### 2.3 Persistence Layer (Repositories)

**Responsabilidades**:
- Acesso a dados
- Queries customizadas
- Abstração do banco de dados

**Exemplo**:
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.points > :minPoints ORDER BY u.points DESC")
    List<User> findTopUsersByPoints(@Param("minPoints") int minPoints, Pageable pageable);
}
```

## 3. Estrutura de Pacotes

```
com.eha.backend/
├── config/                    # Configurações
│   ├── SecurityConfig.java
│   ├── CorsConfig.java
│   ├── SwaggerConfig.java
│   └── DatabaseConfig.java
│
├── controller/                # REST Controllers
│   ├── AuthController.java
│   ├── UserController.java
│   ├── ContentController.java
│   ├── QuizController.java
│   ├── ForumController.java
│   ├── RankingController.java
│   └── AdminController.java
│
├── service/                   # Lógica de Negócio
│   ├── AuthService.java
│   ├── UserService.java
│   ├── ContentService.java
│   ├── QuizService.java
│   ├── ForumService.java
│   ├── RankingService.java
│   └── NotificationService.java
│
├── repository/                # Repositórios JPA
│   ├── UserRepository.java
│   ├── ContentRepository.java
│   ├── QuizRepository.java
│   ├── QuestionRepository.java
│   ├── ForumTopicRepository.java
│   └── RankingRepository.java
│
├── model/                     # Entidades e Enums
│   ├── entity/
│   │   ├── User.java
│   │   ├── Content.java
│   │   ├── Quiz.java
│   │   ├── Question.java
│   │   ├── ForumTopic.java
│   │   └── Ranking.java
│   └── enums/
│       ├── UserRole.java
│       ├── QuizDifficulty.java
│       └── ContentCategory.java
│
├── dto/                       # Data Transfer Objects
│   ├── request/
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── CreateQuizRequest.java
│   │   └── SubmitQuizRequest.java
│   └── response/
│       ├── LoginResponse.java
│       ├── UserResponse.java
│       ├── QuizResultResponse.java
│       └── ApiResponse.java
│
├── mapper/                    # Mapeadores DTO-Entity
│   ├── UserMapper.java
│   ├── ContentMapper.java
│   └── QuizMapper.java
│
├── security/                  # Segurança e JWT
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   ├── CustomUserDetailsService.java
│   └── SecurityUtils.java
│
├── exception/                 # Exceções Customizadas
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   ├── BadRequestException.java
│   ├── UnauthorizedException.java
│   └── ErrorResponse.java
│
├── util/                      # Utilitários
│   ├── DateUtils.java
│   ├── ValidationUtils.java
│   └── Constants.java
│
└── BackendApplication.java    # Classe Principal
```

## 4. Padrões de Design Aplicados

### 4.1 Dependency Injection
- Spring IoC Container gerencia dependências
- @Autowired, @RequiredArgsConstructor (Lombok)

### 4.2 Repository Pattern
- Spring Data JPA abstrai acesso a dados
- Queries derivadas de nomes de métodos

### 4.3 DTO Pattern
- Separação entre entidades e objetos de transferência
- Evita exposição de dados sensíveis

### 4.4 Service Layer Pattern
- Lógica de negócio centralizada
- Transações gerenciadas

### 4.5 Builder Pattern
- Lombok @Builder para construção de objetos
- Facilita criação de objetos complexos

## 5. Configurações Principais

### 5.1 application.properties

```properties
# Server
server.port=8080
spring.application.name=eha-backend

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/eha_db
spring.datasource.username=eha_user
spring.datasource.password=eha_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Flyway
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
spring.flyway.locations=classpath:db/migration

# JWT
jwt.secret=${JWT_SECRET:your-secret-key-change-in-production}
jwt.expiration=86400000
jwt.refresh-expiration=604800000

# File Upload
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB

# Logging
logging.level.com.eha.backend=INFO
logging.level.org.springframework.web=INFO
logging.level.org.hibernate.SQL=DEBUG

# CORS
cors.allowed-origins=http://localhost:3000,http://localhost:19006
```

### 5.2 SecurityConfig.java

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final CustomUserDetailsService userDetailsService;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/health", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
    
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
}
```

## 6. Tratamento de Exceções

### GlobalExceptionHandler.java

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .status(HttpStatus.NOT_FOUND.value())
            .message(ex.getMessage())
            .timestamp(LocalDateTime.now())
            .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .status(HttpStatus.BAD_REQUEST.value())
            .message(ex.getMessage())
            .timestamp(LocalDateTime.now())
            .build();
        return ResponseEntity.badRequest().body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );
        
        ErrorResponse error = ErrorResponse.builder()
            .status(HttpStatus.BAD_REQUEST.value())
            .message("Validation failed")
            .errors(errors)
            .timestamp(LocalDateTime.now())
            .build();
        return ResponseEntity.badRequest().body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        log.error("Unexpected error", ex);
        ErrorResponse error = ErrorResponse.builder()
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .message("An unexpected error occurred")
            .timestamp(LocalDateTime.now())
            .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
```

## 7. Validação de Dados

### Exemplo de DTO com Validação

```java
@Data
@Builder
public class RegisterRequest {
    
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
        message = "Password must be at least 8 characters with uppercase, lowercase and number"
    )
    private String password;
    
    @NotNull(message = "Birth date is required")
    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;
}
```

## 8. Logging

### Configuração de Logs

```java
@Slf4j
@Service
public class UserService {
    
    public User createUser(RegisterRequest request) {
        log.info("Creating new user with email: {}", request.getEmail());
        
        try {
            User user = userMapper.toEntity(request);
            User savedUser = userRepository.save(user);
            log.info("User created successfully with ID: {}", savedUser.getId());
            return savedUser;
        } catch (Exception e) {
            log.error("Error creating user: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create user", e);
        }
    }
}
```

## 9. Testes

### Estrutura de Testes

```
src/test/java/com/eha/backend/
├── controller/
│   ├── AuthControllerTest.java
│   └── UserControllerTest.java
├── service/
│   ├── AuthServiceTest.java
│   └── UserServiceTest.java
├── repository/
│   └── UserRepositoryTest.java
└── integration/
    └── AuthIntegrationTest.java
```

### Exemplo de Teste Unitário

```java
@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private JwtTokenProvider jwtTokenProvider;
    
    @InjectMocks
    private AuthService authService;
    
    @Test
    void login_WithValidCredentials_ReturnsToken() {
        // Arrange
        LoginRequest request = new LoginRequest("test@example.com", "password");
        User user = User.builder()
            .email("test@example.com")
            .password("encodedPassword")
            .build();
        
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(request.getPassword(), user.getPassword())).thenReturn(true);
        when(jwtTokenProvider.generateToken(user)).thenReturn("token");
        
        // Act
        LoginResponse response = authService.login(request);
        
        // Assert
        assertNotNull(response);
        assertEquals("token", response.getToken());
        verify(userRepository).findByEmail(request.getEmail());
    }
}
```

## 10. Performance e Otimização

### 10.1 Caching

```java
@Service
@CacheConfig(cacheNames = "contents")
public class ContentService {
    
    @Cacheable(key = "#id")
    public Content getContentById(Long id) {
        return contentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Content not found"));
    }
    
    @CacheEvict(key = "#id")
    public void updateContent(Long id, UpdateContentRequest request) {
        // Update logic
    }
}
```

### 10.2 Paginação

```java
@GetMapping
public ResponseEntity<Page<ContentResponse>> getAllContents(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(defaultValue = "createdAt,desc") String[] sort
) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(parseSort(sort)));
    Page<Content> contents = contentService.getAllContents(pageable);
    Page<ContentResponse> response = contents.map(contentMapper::toResponse);
    return ResponseEntity.ok(response);
}
```

### 10.3 N+1 Query Problem

```java
@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    
    @Query("SELECT q FROM Quiz q LEFT JOIN FETCH q.questions WHERE q.id = :id")
    Optional<Quiz> findByIdWithQuestions(@Param("id") Long id);
}
```

## 11. Documentação da API

### Swagger/OpenAPI Configuration

```java
@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("EHA API")
                .version("1.0")
                .description("API da plataforma Economia com História: Angola")
                .contact(new Contact()
                    .name("Equipa EHA")
                    .email("eha-team@isptec.co.ao")
                )
            )
            .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
            .components(new Components()
                .addSecuritySchemes("Bearer Authentication", 
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                )
            );
    }
}
```

## 12. Deployment

### Dockerfile

```dockerfile
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: eha_db
      POSTGRES_USER: eha_user
      POSTGRES_PASSWORD: eha_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/eha_db
      SPRING_DATASOURCE_USERNAME: eha_user
      SPRING_DATASOURCE_PASSWORD: eha_password
    depends_on:
      - postgres

volumes:
  postgres_data:
```

## 13. Boas Práticas

✅ **Sempre validar dados de entrada**  
✅ **Usar DTOs para transferência de dados**  
✅ **Implementar tratamento de exceções global**  
✅ **Escrever testes unitários e de integração**  
✅ **Usar transações apropriadamente**  
✅ **Implementar logging adequado**  
✅ **Documentar API com Swagger**  
✅ **Seguir convenções de nomenclatura**  
✅ **Manter código limpo e legível**  
✅ **Usar injeção de dependências**  

## 14. Checklist de Implementação

- [ ] Configurar projeto Spring Boot
- [ ] Configurar PostgreSQL
- [ ] Implementar entidades JPA
- [ ] Criar repositórios
- [ ] Implementar serviços
- [ ] Criar controllers
- [ ] Configurar Spring Security
- [ ] Implementar JWT
- [ ] Adicionar validações
- [ ] Implementar tratamento de exceções
- [ ] Configurar Swagger
- [ ] Escrever testes
- [ ] Configurar CI/CD
- [ ] Criar Dockerfile
- [ ] Deploy
"""

write_file(f"{base}/backend/01-arquitetura-backend.md", backend_arquitetura)

print("\n✅ Documentação backend completada!")
print("📊 Total de documentos a completar: 37")
print("⏳ Continuando...")
