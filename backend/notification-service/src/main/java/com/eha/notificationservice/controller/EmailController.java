package com.eha.notificationservice.controller;

import com.eha.notificationservice.dto.request.EmailVerificationRequest;
import com.eha.notificationservice.dto.request.PasswordResetRequest;
import com.eha.notificationservice.dto.response.ApiResponse;
import com.eha.notificationservice.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/emails")
@Tag(name = "Email", description = "Email notification endpoints")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/verification")
    @Operation(summary = "Send email verification", description = "Send verification email to user")
    public ResponseEntity<ApiResponse<String>> sendVerificationEmail(
            @Valid @RequestBody EmailVerificationRequest request) {
        try {
            emailService.sendVerificationEmail(
                request.getEmail(), 
                request.getUserName(), 
                request.getToken()
            );
            log.info("Verification email requested for: {}", request.getEmail());
            return ResponseEntity.ok(ApiResponse.success("Verification email sent successfully"));
        } catch (Exception e) {
            log.error("Error processing verification email request", e);
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to send verification email: " + e.getMessage()));
        }
    }

    @PostMapping("/password-reset")
    @Operation(summary = "Send password reset email", description = "Send password reset email to user")
    public ResponseEntity<ApiResponse<String>> sendPasswordResetEmail(
            @Valid @RequestBody PasswordResetRequest request) {
        try {
            emailService.sendPasswordResetEmail(
                request.getEmail(), 
                request.getUserName(), 
                request.getToken()
            );
            log.info("Password reset email requested for: {}", request.getEmail());
            return ResponseEntity.ok(ApiResponse.success("Password reset email sent successfully"));
        } catch (Exception e) {
            log.error("Error processing password reset email request", e);
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to send password reset email: " + e.getMessage()));
        }
    }

    @PostMapping("/welcome")
    @Operation(summary = "Send welcome email", description = "Send welcome email to new user")
    public ResponseEntity<ApiResponse<String>> sendWelcomeEmail(
            @RequestParam String email,
            @RequestParam String userName) {
        try {
            emailService.sendWelcomeEmail(email, userName);
            log.info("Welcome email requested for: {}", email);
            return ResponseEntity.ok(ApiResponse.success("Welcome email sent successfully"));
        } catch (Exception e) {
            log.error("Error processing welcome email request", e);
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to send welcome email: " + e.getMessage()));
        }
    }
}
