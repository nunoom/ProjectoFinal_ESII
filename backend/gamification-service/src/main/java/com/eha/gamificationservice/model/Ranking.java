package com.eha.gamificationservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "rankings")
@Getter
@Setter
public class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false)
    private Integer points = 0;

    @Column(name = "rank_position")
    private Integer rankPosition;

    @Column(name = "period_type", nullable = false)
    private String periodType; // GLOBAL, WEEKLY, MONTHLY

    @Column(name = "period_start", nullable = false)
    private LocalDate periodStart;

    @Column(name = "period_end", nullable = false)
    private LocalDate periodEnd;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    public void onCreate() {
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = Instant.now();
    }
}
