package com.eha.quizservice.dto.response;

public record QuizSummaryResponse(
    Long id,
    String title,
    String description,
    String category,
    String difficulty,
    Integer questionCount,
    Integer points,
    Integer timeLimit,
    Boolean completed
) {}
