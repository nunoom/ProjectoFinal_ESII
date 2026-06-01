package com.eha.contentservice.model;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "contents")
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String summary;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    private String imageUrl;

    private int readTime;

    private int views;

    private String status;

    private Instant createdAt;

    private Instant updatedAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id")
    private Category category;

    @PrePersist
    public void onCreate() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = Instant.now();
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public int getReadTime() { return readTime; }
    public void setReadTime(int readTime) { this.readTime = readTime; }
    public int getViews() { return views; }
    public void setViews(int views) { this.views = views; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}
