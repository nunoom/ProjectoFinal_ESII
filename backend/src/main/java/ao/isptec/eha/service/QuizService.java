package ao.isptec.eha.service;

import ao.isptec.eha.dto.QuizDtos.*;
import ao.isptec.eha.exception.ApiExceptions.BadRequestException;
import ao.isptec.eha.exception.ApiExceptions.NotFoundException;
import ao.isptec.eha.model.*;
import ao.isptec.eha.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private static final long FIRST_QUIZ_BADGE_ID = 1L;

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository attemptRepository;
    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;

    public QuizService(QuizRepository quizRepository, QuizAttemptRepository attemptRepository,
                       UserRepository userRepository, BadgeRepository badgeRepository,
                       UserBadgeRepository userBadgeRepository) {
        this.quizRepository = quizRepository;
        this.attemptRepository = attemptRepository;
        this.userRepository = userRepository;
        this.badgeRepository = badgeRepository;
        this.userBadgeRepository = userBadgeRepository;
    }

    @Transactional(readOnly = true)
    public QuizListResponse list(String category, String difficulty, User currentUser) {
        List<QuizSummaryDto> quizzes = quizRepository.findAll().stream()
                .filter(q -> category == null || q.getCategory().equalsIgnoreCase(category))
                .filter(q -> difficulty == null || q.getDifficulty().name().equalsIgnoreCase(difficulty))
                .map(q -> toSummary(q, currentUser))
                .toList();
        return new QuizListResponse(quizzes);
    }

    @Transactional(readOnly = true)
    public QuizDetailDto detail(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Quiz não encontrado"));
        List<QuestionDto> questions = quiz.getQuestions().stream()
                .map(q -> new QuestionDto(q.getId(), q.getText(), q.getType().name(),
                        q.getOptions().stream()
                                .map(o -> new OptionDto(o.getId(), o.getText()))
                                .toList()))
                .toList();
        return new QuizDetailDto(quiz.getId(), quiz.getTitle(), quiz.getDescription(),
                quiz.getCategory(), quiz.getDifficulty().name(), quiz.getPoints(),
                quiz.getTimeLimit(), questions);
    }

    @Transactional
    public SubmitQuizResponse submit(Long quizId, SubmitQuizRequest request, User user) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new NotFoundException("Quiz não encontrado"));

        Map<Long, Long> answersByQuestion = request.answers().stream()
                .collect(Collectors.toMap(AnswerDto::questionId, AnswerDto::selectedOptionId,
                        (a, b) -> b));

        List<QuestionResultDto> results = new ArrayList<>();
        int correctCount = 0;
        for (Question question : quiz.getQuestions()) {
            QuestionOption correctOption = question.getOptions().stream()
                    .filter(QuestionOption::isCorrect)
                    .findFirst()
                    .orElseThrow(() -> new BadRequestException("Questão sem resposta correta configurada"));
            Long selected = answersByQuestion.get(question.getId());
            boolean correct = correctOption.getId().equals(selected);
            if (correct) {
                correctCount++;
            }
            results.add(new QuestionResultDto(question.getId(), correct, selected,
                    correctOption.getId(), question.getExplanation()));
        }

        int total = quiz.getQuestions().size();
        int score = total == 0 ? 0 : Math.round(correctCount * 100f / total);
        int pointsEarned = total == 0 ? 0 : Math.round((float) correctCount / total * quiz.getPoints());

        user.addPoints(pointsEarned);
        userRepository.save(user);

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUser(user);
        attempt.setQuiz(quiz);
        attempt.setScore(score);
        attempt.setCorrectAnswers(correctCount);
        attempt.setTotalQuestions(total);
        attempt.setPointsEarned(pointsEarned);
        attempt.setTimeSpent(Math.max(request.timeSpent(), 0));
        attemptRepository.save(attempt);

        awardFirstQuizBadge(user);

        return new SubmitQuizResponse(score, correctCount, total, pointsEarned, score >= 50, results);
    }

    @Transactional(readOnly = true)
    public QuizHistoryResponse history(User user) {
        List<AttemptDto> attempts = attemptRepository.findByUserIdOrderByCompletedAtDesc(user.getId())
                .stream()
                .map(a -> new AttemptDto(a.getQuiz().getId(), a.getQuiz().getTitle(), a.getScore(),
                        a.getPointsEarned(), a.getCompletedAt()))
                .toList();
        return new QuizHistoryResponse(attempts);
    }

    private QuizSummaryDto toSummary(Quiz quiz, User currentUser) {
        boolean completed = currentUser != null &&
                attemptRepository.existsByUserIdAndQuizId(currentUser.getId(), quiz.getId());
        return new QuizSummaryDto(quiz.getId(), quiz.getTitle(), quiz.getDescription(),
                quiz.getCategory(), quiz.getDifficulty().name(), quiz.getQuestions().size(),
                quiz.getPoints(), quiz.getTimeLimit(), completed);
    }

    private void awardFirstQuizBadge(User user) {
        if (attemptRepository.countByUserId(user.getId()) == 1) {
            badgeRepository.findById(FIRST_QUIZ_BADGE_ID).ifPresent(badge -> {
                if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badge.getId())) {
                    userBadgeRepository.save(new UserBadge(user, badge));
                }
            });
        }
    }
}
