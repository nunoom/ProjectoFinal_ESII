package com.eha.gamificationservice.dto.response;

import java.time.Instant;

public record UserBadgeResponse(
    Long id,
    String name,
    String description,
    String icon,
    Instant earnedAt
) {}
