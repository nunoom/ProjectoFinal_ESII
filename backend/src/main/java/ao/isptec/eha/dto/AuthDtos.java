package ao.isptec.eha.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class AuthDtos {

    private AuthDtos() {}

    public record RegisterRequest(
            @NotBlank @Size(min = 3, max = 100) String name,
            @NotBlank @Email String email,
            @NotBlank @Size(min = 6, max = 100) String password) {}

    public record RegisterResponse(String message, Long userId) {}

    public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {}

    public record RefreshRequest(@NotBlank String refreshToken) {}

    public record ForgotPasswordRequest(@NotBlank @Email String email) {}

    public record VerifyEmailRequest(@NotBlank @Email String email, @NotBlank String code) {}

    public record ResendCodeRequest(@NotBlank @Email String email) {}

    public record ResetPasswordRequest(
            @NotBlank @Email String email,
            @NotBlank String code,
            @NotBlank @Size(min = 6, max = 100) String newPassword) {}

    public record AuthResponse(String token, String refreshToken, CommonDtos.UserDto user) {}

    public record TokenPairResponse(String token, String refreshToken) {}
}
