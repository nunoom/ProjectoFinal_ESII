package com.eha.quizservice.dto.response;

import java.util.List;

public record QuestionResponse(
    Long id,
    String text,
    String type,
    List<QuestionOptionResponse> options
) {}
