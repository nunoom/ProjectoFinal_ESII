package com.eha.forumservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;

@Entity
@Table(name = "forum_reports")
@Getter
@Setter
public class ForumReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reporter_id", nullable = false)
    private Long reporterId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    private ForumTopic topic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reply_id")
    private ForumReply reply;

    @Column(nullable = false)
    private String reason; // SPAM, OFFENSIVE, OFF_TOPIC, OTHER

    @Column(columnDefinition = "TEXT")
    private String description;

    private String status = "PENDING"; // PENDING, REVIEWED, DISMISSED

    @Column(name = "reviewed_by")
    private Long reviewedBy;

    @Column(name = "reviewed_at")
    private Instant reviewedAt;

    @Column(name = "created_at")
    private Instant createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = Instant.now();
    }
}
