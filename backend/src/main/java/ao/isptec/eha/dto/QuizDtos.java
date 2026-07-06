package ao.isptec.eha.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.List;

public final class QuizDtos {

    private QuizDtos() {}

    public record QuizSummaryDto(Long id, String title, String description, String category,
                                 String difficulty, int questionCount, int points,
                                 Integer timeLimit, boolean completed) {}

    public record OptionDto(Long id, String text) {}

    public record QuestionDto(Long id, String text, String type, List<OptionDto> options) {}

    public record QuizDetailDto(Long id, String title, String description, String category,
                                String difficulty, int points, Integer timeLimit,
                                List<QuestionDto> questions) {}

    public record AnswerDto(@NotNull Long questionId, @NotNull Long selectedOptionId) {}

    public record SubmitQuizRequest(@NotEmpty List<AnswerDto> answers, int timeSpent) {}

    public record QuestionResultDto(Long questionId, boolean correct, Long selectedOption,
                                    Long correctOption, String explanation) {}

    public record SubmitQuizResponse(int score, int correctAnswers, int totalQuestions,
                                     int pointsEarned, boolean passed,
                                     List<QuestionResultDto> results) {}

    public record AttemptDto(Long quizId, String quizTitle, int score, int pointsEarned,
                             Instant completedAt) {}

    public record QuizHistoryResponse(List<AttemptDto> attempts) {}

    public record QuizListResponse(List<QuizSummaryDto> quizzes) {}
}
