package com.eha.authservice.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ForgotPasswordRequest {
    @NotBlank
    @Email
    private String email;

    public String getEmail() {
        return email;
    }
}
