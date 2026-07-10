package ao.isptec.eha.service;

import ao.isptec.eha.dto.AuthDtos.*;
import ao.isptec.eha.dto.CommonDtos.MessageResponse;
import ao.isptec.eha.dto.CommonDtos.UserDto;
import ao.isptec.eha.exception.ApiExceptions.BadRequestException;
import ao.isptec.eha.exception.ApiExceptions.UnauthorizedException;
import ao.isptec.eha.model.User;
import ao.isptec.eha.repository.UserRepository;
import ao.isptec.eha.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;

@Service
public class AuthService {

    private static final Duration CODE_VALIDITY = Duration.ofHours(24);
    private static final Duration RESET_VALIDITY = Duration.ofHours(1);
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MailService mailService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService, MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email().toLowerCase())) {
            throw new BadRequestException("Já existe uma conta com este email");
        }
        User user = new User(request.name(), request.email().toLowerCase(),
                passwordEncoder.encode(request.password()));
        user.setPhotoUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                request.name().replaceAll("\\s+", ""));
        assignVerificationCode(user);
        user = userRepository.save(user);

        mailService.sendVerificationCode(user.getEmail(), user.getName(), user.getVerificationCode());

        return new RegisterResponse(
                "Conta criada. Verifique o seu email com o código enviado.", user.getId());
    }

    @Transactional
    public MessageResponse verifyEmail(VerifyEmailRequest request) {
        User user = userRepository.findByEmail(request.email().toLowerCase())
                .orElseThrow(() -> new BadRequestException("Código inválido"));
        if (user.isEmailVerified()) {
            return new MessageResponse("Email já verificado. Pode iniciar sessão.");
        }
        boolean valid = user.getVerificationCode() != null
                && user.getVerificationCode().equals(request.code())
                && user.getVerificationExpiresAt() != null
                && user.getVerificationExpiresAt().isAfter(Instant.now());
        if (!valid) {
            throw new BadRequestException("Código inválido ou expirado");
        }
        user.setEmailVerified(true);
        user.setVerificationCode(null);
        user.setVerificationExpiresAt(null);
        return new MessageResponse("Email verificado com sucesso. Pode iniciar sessão.");
    }

    @Transactional
    public MessageResponse resendCode(ResendCodeRequest request) {
        userRepository.findByEmail(request.email().toLowerCase())
                .filter(user -> !user.isEmailVerified())
                .ifPresent(user -> {
                    assignVerificationCode(user);
                    mailService.sendVerificationCode(user.getEmail(), user.getName(),
                            user.getVerificationCode());
                });
        // Resposta genérica para não revelar se o email existe
        return new MessageResponse("Se existir uma conta por verificar, foi enviado um novo código.");
    }

    @Transactional
    public MessageResponse forgotPassword(ForgotPasswordRequest request) {
        userRepository.findByEmail(request.email().toLowerCase())
                .ifPresent(user -> {
                    user.setResetCode(generateCode());
                    user.setResetExpiresAt(Instant.now().plus(RESET_VALIDITY));
                    mailService.sendPasswordResetCode(user.getEmail(), user.getName(),
                            user.getResetCode());
                });
        // Resposta genérica para não revelar se o email existe
        return new MessageResponse(
                "Se existir uma conta com este email, foi enviado um código de recuperação.");
    }

    @Transactional
    public MessageResponse resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByEmail(request.email().toLowerCase())
                .orElseThrow(() -> new BadRequestException("Código inválido ou expirado"));
        boolean valid = user.getResetCode() != null
                && user.getResetCode().equals(request.code())
                && user.getResetExpiresAt() != null
                && user.getResetExpiresAt().isAfter(Instant.now());
        if (!valid) {
            throw new BadRequestException("Código inválido ou expirado");
        }
        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        user.setResetCode(null);
        user.setResetExpiresAt(null);
        // A posse do código prova o controlo do email, pelo que fica verificado
        user.setEmailVerified(true);
        return new MessageResponse("Password redefinida com sucesso. Pode iniciar sessão.");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email().toLowerCase())
                .orElseThrow(() -> new UnauthorizedException("Email ou password incorretos"));
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new UnauthorizedException("Email ou password incorretos");
        }
        if (!user.isEmailVerified()) {
            throw new UnauthorizedException(
                    "Email não verificado. Introduza o código enviado para o seu email.");
        }
        return new AuthResponse(
                jwtService.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name()),
                jwtService.generateRefreshToken(user.getId()),
                UserDto.from(user));
    }

    public TokenPairResponse refresh(RefreshRequest request) {
        Long userId = jwtService.parseUserId(request.refreshToken(), "refresh")
                .orElseThrow(() -> new UnauthorizedException("Refresh token inválido ou expirado"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedException("Utilizador não encontrado"));
        return new TokenPairResponse(
                jwtService.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name()),
                jwtService.generateRefreshToken(user.getId()));
    }

    private void assignVerificationCode(User user) {
        user.setVerificationCode(generateCode());
        user.setVerificationExpiresAt(Instant.now().plus(CODE_VALIDITY));
    }

    private String generateCode() {
        return String.format("%06d", RANDOM.nextInt(1_000_000));
    }
}
