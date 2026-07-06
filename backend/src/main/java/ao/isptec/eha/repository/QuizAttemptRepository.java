package ao.isptec.eha.repository;

import ao.isptec.eha.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserIdOrderByCompletedAtDesc(Long userId);
    boolean existsByUserIdAndQuizId(Long userId, Long quizId);
    long countByUserId(Long userId);
}
