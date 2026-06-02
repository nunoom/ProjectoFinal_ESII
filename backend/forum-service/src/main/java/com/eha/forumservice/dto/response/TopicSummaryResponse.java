package com.eha.forumservice.dto.response;

import java.time.Instant;

public record TopicSummaryResponse(
    Long id,
    String title,
    String category,
    AuthorDto author,
    Integer replyCount,
    Integer views,
    Instant lastReplyAt,
    Instant createdAt
) {
    public record AuthorDto(
        Long id,
        String name,
        String photoUrl
    ) {}
}
