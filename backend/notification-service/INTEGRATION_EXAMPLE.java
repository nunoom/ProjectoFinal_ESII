// ========================================
// EXEMPLO DE INTEGRAÇÃO COM AUTH-SERVICE
// ========================================

// 1. Adicione no auth-service/pom.xml:
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
*/

// 2. Crie um client para o notification-service:
@Service
public class NotificationClient {
    
    private final RestTemplate restTemplate;
    
    @Value("${notification.service.url:http://notification-service:8087}")
    private String notificationServiceUrl;
    
    public NotificationClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    public void sendVerificationEmail(String email, String userName, String token) {
        String url = notificationServiceUrl + "/api/emails/verification";
        
        Map<String, String> request = Map.of(
            "email", email,
            "userName", userName,
            "token", token
        );
        
        try {
            restTemplate.postForEntity(url, request, String.class);
            log.info("Verification email requested for: {}", email);
        } catch (Exception e) {
            log.error("Failed to request verification email", e);
        }
    }
    
    public void sendPasswordResetEmail(String email, String userName, String token) {
        String url = notificationServiceUrl + "/api/emails/password-reset";
        
        Map<String, String> request = Map.of(
            "email", email,
            "userName", userName,
            "token", token
        );
        
        try {
            restTemplate.postForEntity(url, request, String.class);
            log.info("Password reset email requested for: {}", email);
        } catch (Exception e) {
            log.error("Failed to request password reset email", e);
        }
    }
    
    public void sendWelcomeEmail(String email, String userName) {
        String url = notificationServiceUrl + "/api/emails/welcome" +
                    "?email=" + email + "&userName=" + userName;
        
        try {
            restTemplate.postForEntity(url, null, String.class);
            log.info("Welcome email requested for: {}", email);
        } catch (Exception e) {
            log.error("Failed to request welcome email", e);
        }
    }
}

// 3. Use no AuthService:
@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final NotificationClient notificationClient;
    
    // Ao registar novo usuário
    public RegisterResponse register(RegisterRequest request) {
        // Criar usuário
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmailVerified(false);
        userRepository.save(user);
        
        // Criar token de verificação
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUserId(user.getId());
        verificationToken.setExpiryDate(LocalDateTime.now().plusDays(1)); // 24h
        tokenRepository.save(verificationToken);
        
        // Enviar email de verificação
        notificationClient.sendVerificationEmail(
            user.getEmail(),
            user.getName(),
            token
        );
        
        return new RegisterResponse("User registered. Please verify your email.");
    }
    
    // Ao verificar email
    public void verifyEmail(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token)
            .orElseThrow(() -> new IllegalArgumentException("Invalid token"));
        
        if (verificationToken.isExpired()) {
            throw new IllegalArgumentException("Token expired");
        }
        
        User user = userRepository.findById(verificationToken.getUserId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        user.setEmailVerified(true);
        userRepository.save(user);
        
        tokenRepository.delete(verificationToken);
        
        // Enviar email de boas-vindas
        notificationClient.sendWelcomeEmail(user.getEmail(), user.getName());
    }
    
    // Ao solicitar reset de senha
    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        // Criar token de reset
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUserId(user.getId());
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1)); // 1h
        tokenRepository.save(resetToken);
        
        // Enviar email de reset
        notificationClient.sendPasswordResetEmail(
            user.getEmail(),
            user.getName(),
            token
        );
    }
    
    // Ao resetar senha
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
            .orElseThrow(() -> new IllegalArgumentException("Invalid token"));
        
        if (resetToken.isExpired()) {
            throw new IllegalArgumentException("Token expired");
        }
        
        User user = userRepository.findById(resetToken.getUserId())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        tokenRepository.delete(resetToken);
    }
}

// 4. Crie as entidades de Token:
@Entity
@Table(name = "verification_tokens")
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String token;
    
    @Column(nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private LocalDateTime expiryDate;
    
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryDate);
    }
    
    // getters/setters...
}

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String token;
    
    @Column(nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private LocalDateTime expiryDate;
    
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryDate);
    }
    
    // getters/setters...
}

// 5. Crie o repository:
public interface TokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
    void deleteByUserId(Long userId);
}

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUserId(Long userId);
}

// 6. Crie os endpoints no AuthController:
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterRequest request) {
        RegisterResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse> verifyEmail(@RequestParam String token) {
        authService.verifyEmail(token);
        return ResponseEntity.ok(ApiResponse.success("Email verified successfully"));
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.requestPasswordReset(request.getEmail());
        return ResponseEntity.ok(ApiResponse.success("Password reset email sent"));
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok(ApiResponse.success("Password reset successfully"));
    }
}

// 7. Configure o RestTemplate bean:
@Configuration
public class AppConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

// ========================================
// FLUXO COMPLETO
// ========================================

/*
1. REGISTRO:
   User -> Auth Service -> Create User -> Create Token -> Notification Service -> Email Verification

2. VERIFICAÇÃO:
   User clicks link -> Auth Service /verify-email?token=xxx -> Verify Token -> Update User -> 
   Notification Service -> Welcome Email

3. ESQUECEU SENHA:
   User -> Auth Service /forgot-password -> Find User -> Create Reset Token -> 
   Notification Service -> Password Reset Email

4. RESETAR SENHA:
   User clicks link -> Frontend /reset-password?token=xxx -> User enters new password ->
   Auth Service /reset-password -> Verify Token -> Update Password
*/
