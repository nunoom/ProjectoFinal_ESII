package com.eha.userservice.dto.response;

import java.time.Instant;

public record UserProfileResponse(
    Long id,
    String name,
    String email,
    String bio,
    String photoUrl,
    int points,
    int level,
    String role,
    Instant createdAt
) {}
