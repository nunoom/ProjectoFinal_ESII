package com.eha.quizservice.dto.response;

import java.time.Instant;

public record QuizAttemptResponse(
    Long quizId,
    String quizTitle,
    Integer score,
    Integer pointsEarned,
    Instant completedAt
) {}
