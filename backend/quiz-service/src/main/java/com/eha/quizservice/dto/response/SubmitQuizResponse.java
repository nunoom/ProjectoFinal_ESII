package com.eha.quizservice.dto.response;

import java.util.List;

public record SubmitQuizResponse(
    Integer score,
    Integer correctAnswers,
    Integer totalQuestions,
    Integer pointsEarned,
    Boolean passed,
    List<QuestionResultDto> results
) {
    public record QuestionResultDto(
        Long questionId,
        Boolean correct,
        Long selectedOption,
        Long correctOption,
        String explanation
    ) {}
}
