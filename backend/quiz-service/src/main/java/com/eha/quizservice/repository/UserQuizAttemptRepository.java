package com.eha.quizservice.repository;

import com.eha.quizservice.model.UserQuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserQuizAttemptRepository extends JpaRepository<UserQuizAttempt, Long> {
    List<UserQuizAttempt> findByUserIdOrderByCompletedAtDesc(Long userId);
    Optional<UserQuizAttempt> findFirstByUserIdAndQuizIdOrderByCompletedAtDesc(Long userId, Long quizId);
}
