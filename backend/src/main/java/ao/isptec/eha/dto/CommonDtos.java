package ao.isptec.eha.dto;

import ao.isptec.eha.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public final class CommonDtos {

    private CommonDtos() {}

    public record MessageResponse(String message) {}

    public record UserDto(Long id, String name, String email, String bio, String photoUrl,
                          int points, int level, String role, Instant createdAt) {
        public static UserDto from(User user) {
            return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getBio(),
                    user.getPhotoUrl(), user.getPoints(), user.getLevel(),
                    user.getRole().name(), user.getCreatedAt());
        }
    }

    public record AuthorDto(Long id, String name, String photoUrl) {
        public static AuthorDto from(User user) {
            return new AuthorDto(user.getId(), user.getName(), user.getPhotoUrl());
        }
    }

    public record UpdateProfileRequest(
            @NotBlank @Size(min = 3, max = 100) String name,
            @Size(max = 500) String bio) {}

    public record BadgeDto(Long id, String name, String description, String icon,
                           boolean earned, Instant earnedAt) {}
}
