package com.eha.contentservice.dto.response;

import java.time.Instant;

public record ContentSummaryResponse(
    Long id,
    String title,
    String summary,
    String imageUrl,
    String category,
    int readTime,
    int views,
    Instant createdAt
) {}
