package com.eha.contentservice.dto.response;

import java.time.Instant;
import java.util.List;

public record ContentDetailResponse(
    Long id,
    String title,
    String content,
    String summary,
    String imageUrl,
    String category,
    List<String> tags,
    int readTime,
    int views,
    Instant createdAt
) {}
