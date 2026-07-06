package com.eha.quizservice.dto.request;

import java.util.List;

public record SubmitQuizRequest(
    List<AnswerDto> answers,
    Integer timeSpent
) {
    public record AnswerDto(
        Long questionId,
        Long selectedOptionId
    ) {}
}
