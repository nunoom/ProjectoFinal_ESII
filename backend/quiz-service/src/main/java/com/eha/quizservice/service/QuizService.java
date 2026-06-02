package com.eha.quizservice.service;

import com.eha.quizservice.dto.request.SubmitQuizRequest;
import com.eha.quizservice.dto.response.*;
import com.eha.quizservice.model.*;
import com.eha.quizservice.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class QuizService {

    private final QuizRepository quizRepository;
    private final UserQuizAttemptRepository attemptRepository;
    private final UserAnswerRepository userAnswerRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public QuizService(QuizRepository quizRepository,
                       UserQuizAttemptRepository attemptRepository,
                       UserAnswerRepository userAnswerRepository) {
        this.quizRepository = quizRepository;
        this.attemptRepository = attemptRepository;
        this.userAnswerRepository = userAnswerRepository;
    }

    public List<QuizSummaryResponse> getQuizzes(String category, String difficulty, Long userId) {
        List<Quiz> quizzes;
        if (category != null && difficulty != null) {
            quizzes = quizRepository.findActiveByCategoryAndDifficulty(category, difficulty);
        } else if (category != null) {
            quizzes = quizRepository.findActiveByCategory(category);
        } else if (difficulty != null) {
            quizzes = quizRepository.findActiveByDifficulty(difficulty);
        } else {
            quizzes = quizRepository.findAllActive();
        }

        List<QuizSummaryResponse> responses = new ArrayList<>();
        for (Quiz q : quizzes) {
            boolean completed = false;
            if (userId != null) {
                completed = attemptRepository.findFirstByUserIdAndQuizIdOrderByCompletedAtDesc(userId, q.getId())
                    .map(UserQuizAttempt::getPassed)
                    .orElse(false);
            }

            int questionCount = q.getQuestions() != null ? q.getQuestions().size() : 0;

            responses.add(new QuizSummaryResponse(
                q.getId(),
                q.getTitle(),
                q.getDescription(),
                q.getCategory().getName(),
                q.getDifficulty(),
                questionCount,
                q.getPoints(),
                q.getTimeLimit(),
                completed
            ));
        }
        return responses;
    }

    public QuizDetailResponse getQuiz(Long quizId) {
        Quiz quiz = quizRepository.findByIdWithQuestions(quizId)
            .orElseThrow(() -> new IllegalStateException("Quiz not found"));

        List<QuestionResponse> questions = quiz.getQuestions().stream()
            .map(q -> {
                List<QuestionOptionResponse> options = q.getOptions().stream()
                    .map(o -> new QuestionOptionResponse(o.getId(), o.getText()))
                    .toList();
                return new QuestionResponse(q.getId(), q.getText(), q.getType(), options);
            })
            .toList();

        return new QuizDetailResponse(
            quiz.getId(),
            quiz.getTitle(),
            quiz.getDescription(),
            quiz.getTimeLimit(),
            questions
        );
    }

    public SubmitQuizResponse submitQuiz(Long quizId, Long userId, SubmitQuizRequest request) {
        Quiz quiz = quizRepository.findByIdWithQuestions(quizId)
            .orElseThrow(() -> new IllegalStateException("Quiz not found"));

        // Check if attempted in last 24h
        Optional<UserQuizAttempt> lastAttemptOpt = attemptRepository.findFirstByUserIdAndQuizIdOrderByCompletedAtDesc(userId, quizId);
        if (lastAttemptOpt.isPresent()) {
            Instant lastCompleted = lastAttemptOpt.get().getCompletedAt();
            if (lastCompleted.plus(Duration.ofDays(1)).isAfter(Instant.now())) {
                throw new IllegalStateException("You must wait 24 hours between attempts for this quiz.");
            }
        }

        List<Question> questions = quiz.getQuestions();
        int totalQuestions = questions.size();
        int correctAnswers = 0;

        List<SubmitQuizResponse.QuestionResultDto> results = new ArrayList<>();
        List<UserAnswer> userAnswers = new ArrayList<>();

        UserQuizAttempt attempt = new UserQuizAttempt();
        attempt.setUserId(userId);
        attempt.setQuizId(quizId);
        attempt.setTotalQuestions(totalQuestions);
        attempt.setTimeSpent(request.timeSpent());

        for (Question q : questions) {
            Long selectedOptionId = request.answers().stream()
                .filter(a -> a.questionId().equals(q.getId()))
                .map(SubmitQuizRequest.AnswerDto::selectedOptionId)
                .findFirst()
                .orElse(null);

            QuestionOption correctOption = q.getOptions().stream()
                .filter(QuestionOption::getIsCorrect)
                .findFirst()
                .orElse(null);

            boolean isCorrect = false;
            if (selectedOptionId != null && correctOption != null) {
                isCorrect = selectedOptionId.equals(correctOption.getId());
            }

            if (isCorrect) {
                correctAnswers++;
            }

            results.add(new SubmitQuizResponse.QuestionResultDto(
                q.getId(),
                isCorrect,
                selectedOptionId,
                correctOption != null ? correctOption.getId() : null,
                q.getExplanation()
            ));

            UserAnswer ua = new UserAnswer();
            ua.setAttempt(attempt);
            ua.setQuestionId(q.getId());
            ua.setSelectedOptionId(selectedOptionId);
            ua.setIsCorrect(isCorrect);
            userAnswers.add(ua);
        }

        int score = totalQuestions > 0 ? (correctAnswers * 100) / totalQuestions : 0;
        boolean passed = score >= (quiz.getPassPercentage() != null ? quiz.getPassPercentage() : 70);

        int basePoints = "EASY".equalsIgnoreCase(quiz.getDifficulty()) ? 10 :
            ("MEDIUM".equalsIgnoreCase(quiz.getDifficulty()) ? 25 : 50);

        double ratio = totalQuestions > 0 ? (double) correctAnswers / totalQuestions : 0;
        int pointsEarned = (int) Math.round(ratio * basePoints);

        // Time Spent Bonus: 20% if time < 50% limit
        if (request.timeSpent() != null && quiz.getTimeLimit() != null && request.timeSpent() < (quiz.getTimeLimit() / 2)) {
            pointsEarned = (int) Math.round(pointsEarned * 1.2);
        }

        attempt.setScore(score);
        attempt.setCorrectAnswers(correctAnswers);
        attempt.setPointsEarned(pointsEarned);
        attempt.setPassed(passed);

        UserQuizAttempt savedAttempt = attemptRepository.save(attempt);
        for (UserAnswer ua : userAnswers) {
            userAnswerRepository.save(ua);
        }

        // Call user-service to credit points
        if (pointsEarned > 0) {
            try {
                restTemplate.postForObject(
                    "http://user-service:8082/api/users/internal/" + userId + "/points/add?points=" + pointsEarned,
                    null,
                    Object.class
                );
            } catch (Exception e) {
                System.err.println("Failed to update points in user-service: " + e.getMessage());
            }

            // Call gamification-service to update rankings
            try {
                restTemplate.postForObject(
                    "http://gamification-service:8085/api/ranking/internal/update?userId=" + userId +
                    "&categoryId=" + quiz.getCategory().getId() + "&points=" + pointsEarned,
                    null,
                    Object.class
                );
            } catch (Exception e) {
                System.err.println("Failed to update rankings in gamification-service: " + e.getMessage());
            }
        }

        return new SubmitQuizResponse(
            score,
            correctAnswers,
            totalQuestions,
            pointsEarned,
            passed,
            results
        );
    }

    public List<QuizAttemptResponse> getAttemptsHistory(Long userId) {
        List<UserQuizAttempt> attempts = attemptRepository.findByUserIdOrderByCompletedAtDesc(userId);
        List<QuizAttemptResponse> responses = new ArrayList<>();
        for (UserQuizAttempt a : attempts) {
            String title = quizRepository.findById(a.getQuizId())
                .map(Quiz::getTitle)
                .orElse("Unknown Quiz");
            responses.add(new QuizAttemptResponse(
                a.getQuizId(),
                title,
                a.getScore(),
                a.getPointsEarned(),
                a.getCompletedAt()
            ));
        }
        return responses;
    }

    public Quiz saveQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }
}
