package com.eha.quizservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "question_options")
@Getter
@Setter
public class QuestionOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    @Column(name = "is_correct")
    private Boolean isCorrect = false;

    @Column(name = "order_num")
    private Integer orderNum;
}
