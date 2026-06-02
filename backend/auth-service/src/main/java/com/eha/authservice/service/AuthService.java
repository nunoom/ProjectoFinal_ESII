package com.eha.authservice.service;

import com.eha.authservice.dto.request.ForgotPasswordRequest;
import com.eha.authservice.dto.request.LoginRequest;
import com.eha.authservice.dto.request.RefreshRequest;
import com.eha.authservice.dto.request.RegisterRequest;
import com.eha.authservice.dto.request.ResetPasswordRequest;
import com.eha.authservice.dto.response.AuthResponse;
import com.eha.authservice.dto.response.MessageResponse;
import com.eha.authservice.exception.ApiException;
import com.eha.authservice.model.AuthUser;
import com.eha.authservice.model.RefreshToken;
import com.eha.authservice.repository.AuthUserRepository;
import com.eha.authservice.repository.RefreshTokenRepository;
import com.eha.authservice.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuthService {

    private static final int MAX_FAILED_ATTEMPTS = 5;

    private final AuthUserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(AuthUserRepository userRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public MessageResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ApiException("EMAIL_EXISTS", "Email already registered");
        }

        AuthUser user = new AuthUser();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setBirthDate(request.getBirthDate());
        user.setRole("ROLE_STUDENT");
        user.setStatus("ACTIVE");
        user.setEmailConfirmed(false);
        user.setEmailConfirmationToken(UUID.randomUUID().toString());
        AuthUser saved = userRepository.save(user);

        // Call user-service to create user profile
        try {
            org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
            java.util.Map<String, Object> profileReq = java.util.Map.of(
                "id", saved.getId(),
                "name", saved.getName(),
                "email", saved.getEmail(),
                "birthDate", saved.getBirthDate() != null ? saved.getBirthDate().toString() : ""
            );
            restTemplate.postForObject("http://user-service:8082/api/users/internal/create", profileReq, Object.class);
        } catch (Exception e) {
            System.err.println("Failed to replicate profile to user-service: " + e.getMessage());
        }

        return new MessageResponse("User registered. Please confirm email.", saved.getId());
    }

    public AuthResponse login(LoginRequest request) {
        AuthUser user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ApiException("INVALID_CREDENTIALS", "Invalid credentials"));

        if (!user.isEmailConfirmed()) {
            throw new ApiException("EMAIL_NOT_CONFIRMED", "Email not confirmed");
        }

        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(Instant.now())) {
            throw new ApiException("ACCOUNT_LOCKED", "Account locked. Try later.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            int attempts = user.getFailedAttempts() + 1;
            user.setFailedAttempts(attempts);
            if (attempts >= MAX_FAILED_ATTEMPTS) {
                user.setLockedUntil(Instant.now().plusSeconds(15 * 60));
                user.setFailedAttempts(0);
            }
            userRepository.save(user);
            throw new ApiException("INVALID_CREDENTIALS", "Invalid credentials");
        }

        user.setFailedAttempts(0);
        user.setLockedUntil(null);
        user.setLastLogin(Instant.now());
        userRepository.save(user);

        String token = jwtTokenProvider.generateAccessToken(user.getId(), user.getRole());
        RefreshToken refreshToken = issueRefreshToken(user);

        return new AuthResponse(token, refreshToken.getToken(),
            new AuthResponse.UserInfo(user.getId(), user.getName(), user.getEmail(), user.getRole()));
    }

    public AuthResponse refresh(RefreshRequest request) {
        RefreshToken stored = refreshTokenRepository.findByToken(request.getRefreshToken())
            .orElseThrow(() -> new ApiException("INVALID_REFRESH", "Refresh token invalid"));

        if (stored.isRevoked() || stored.getExpiresAt().isBefore(Instant.now())) {
            throw new ApiException("INVALID_REFRESH", "Refresh token expired");
        }

        stored.setRevoked(true);
        refreshTokenRepository.save(stored);

        AuthUser user = stored.getUser();

        String token = jwtTokenProvider.generateAccessToken(user.getId(), user.getRole());
        RefreshToken refreshToken = issueRefreshToken(user);

        return new AuthResponse(token, refreshToken.getToken(),
            new AuthResponse.UserInfo(user.getId(), user.getName(), user.getEmail(), user.getRole()));
    }

    public MessageResponse forgotPassword(ForgotPasswordRequest request) {
        AuthUser user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ApiException("NOT_FOUND", "User not found"));

        user.setPasswordResetToken(UUID.randomUUID().toString());
        user.setPasswordResetExpires(Instant.now().plusSeconds(3600));
        userRepository.save(user);

        return new MessageResponse("Password reset email sent", user.getId());
    }

    public MessageResponse resetPassword(ResetPasswordRequest request) {
        AuthUser user = userRepository.findByPasswordResetToken(request.getToken())
            .orElseThrow(() -> new ApiException("INVALID_TOKEN", "Invalid token"));

        if (user.getPasswordResetExpires() == null || user.getPasswordResetExpires().isBefore(Instant.now())) {
            throw new ApiException("INVALID_TOKEN", "Token expired");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setPasswordResetToken(null);
        user.setPasswordResetExpires(null);
        userRepository.save(user);

        return new MessageResponse("Password updated", user.getId());
    }

    public MessageResponse confirmEmail(String token) {
        AuthUser user = userRepository.findByEmailConfirmationToken(token)
            .orElseThrow(() -> new ApiException("INVALID_TOKEN", "Invalid token"));

        user.setEmailConfirmed(true);
        user.setEmailConfirmationToken(null);
        userRepository.save(user);

        return new MessageResponse("Email confirmed", user.getId());
    }

    public void updateUserRole(Long userId, String role) {
        AuthUser user = userRepository.findById(userId)
            .orElseThrow(() -> new ApiException("NOT_FOUND", "User not found"));
        user.setRole(role);
        userRepository.save(user);
    }

    private RefreshToken issueRefreshToken(AuthUser user) {
        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiresAt(jwtTokenProvider.refreshExpiry());
        token.setRevoked(false);
        return refreshTokenRepository.save(token);
    }
}
