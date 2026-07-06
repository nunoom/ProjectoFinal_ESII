package com.eha.quizservice.dto.response;

import java.util.List;

public record QuizDetailResponse(
    Long id,
    String title,
    String description,
    Integer timeLimit,
    List<QuestionResponse> questions
) {}
