package com.eha.authservice.controller;

import com.eha.authservice.dto.response.ApiResponse;
import com.eha.authservice.dto.request.ForgotPasswordRequest;
import com.eha.authservice.dto.request.LoginRequest;
import com.eha.authservice.dto.request.RefreshRequest;
import com.eha.authservice.dto.request.RegisterRequest;
import com.eha.authservice.dto.request.ResetPasswordRequest;
import com.eha.authservice.dto.response.AuthResponse;
import com.eha.authservice.dto.response.MessageResponse;
import com.eha.authservice.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<MessageResponse>> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(201).body(ApiResponse.success(authService.register(request), "Created"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.login(request), "OK"));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(@Valid @RequestBody RefreshRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.refresh(request), "OK"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<MessageResponse>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.forgotPassword(request), "OK"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<MessageResponse>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.resetPassword(request), "OK"));
    }

    @GetMapping("/confirm-email")
    public ResponseEntity<ApiResponse<MessageResponse>> confirmEmail(@RequestParam("token") String token) {
        return ResponseEntity.ok(ApiResponse.success(authService.confirmEmail(token), "OK"));
    }

    @PutMapping("/internal/role")
    public void updateRoleInternal(@RequestParam("userId") Long userId, @RequestParam("role") String role) {
        authService.updateUserRole(userId, role);
    }
}
