package com.eha.forumservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "forum_topics")
@Getter
@Setter
public class ForumTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "author_id", nullable = false)
    private Long authorId;

    private Integer views = 0;

    @Column(name = "reply_count")
    private Integer replyCount = 0;

    @Column(name = "is_pinned")
    private Boolean isPinned = false;

    @Column(name = "is_locked")
    private Boolean isLocked = false;

    private String status = "ACTIVE"; // ACTIVE, DELETED, ARCHIVED

    @Column(name = "last_reply_at")
    private Instant lastReplyAt;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ForumReply> replies;

    @PrePersist
    public void onCreate() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
        this.lastReplyAt = Instant.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = Instant.now();
    }
}
