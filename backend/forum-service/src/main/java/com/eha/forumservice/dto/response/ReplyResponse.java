package com.eha.forumservice.dto.response;

import java.time.Instant;

public record ReplyResponse(
    Long id,
    String content,
    TopicSummaryResponse.AuthorDto author,
    Instant createdAt
) {}
