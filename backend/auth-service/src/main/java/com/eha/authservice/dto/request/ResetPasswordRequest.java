package com.eha.authservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class ResetPasswordRequest {
    @NotBlank
    private String token;

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$")
    private String newPassword;

    public String getToken() {
        return token;
    }

    public String getNewPassword() {
        return newPassword;
    }
}
