package com.eha.forumservice.dto.response;

import java.time.Instant;
import java.util.List;

public record TopicDetailResponse(
    Long id,
    String title,
    String content,
    String category,
    TopicSummaryResponse.AuthorDto author,
    Instant createdAt,
    List<ReplyResponse> replies
) {}
