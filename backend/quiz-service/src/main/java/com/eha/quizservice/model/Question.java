package com.eha.quizservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "questions")
@Getter
@Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    private String type; // MULTIPLE_CHOICE, TRUE_FALSE

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "order_num")
    private Integer orderNum;

    private Instant createdAt;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionOption> options;

    @PrePersist
    public void onCreate() {
        this.createdAt = Instant.now();
    }
}
