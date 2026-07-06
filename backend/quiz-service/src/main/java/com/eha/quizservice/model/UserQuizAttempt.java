package com.eha.quizservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;

@Entity
@Table(name = "user_quiz_attempts")
@Getter
@Setter
public class UserQuizAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "quiz_id", nullable = false)
    private Long quizId;

    private Integer score;

    @Column(name = "correct_answers")
    private Integer correctAnswers;

    @Column(name = "total_questions")
    private Integer totalQuestions;

    @Column(name = "points_earned")
    private Integer pointsEarned;

    @Column(name = "time_spent")
    private Integer timeSpent;

    private Boolean passed;

    @Column(name = "completed_at")
    private Instant completedAt;

    @PrePersist
    public void onCreate() {
        this.completedAt = Instant.now();
    }
}
