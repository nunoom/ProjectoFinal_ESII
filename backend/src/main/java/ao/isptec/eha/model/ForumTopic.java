package ao.isptec.eha.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "forum_topics")
public class ForumTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 4000)
    private String content;

    @Column(nullable = false)
    private String category;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id")
    private User author;

    @Column(nullable = false)
    private long views = 0;

    @Column(nullable = false)
    private Instant lastReplyAt = Instant.now();

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public ForumTopic() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }
    public long getViews() { return views; }
    public void setViews(long views) { this.views = views; }
    public Instant getLastReplyAt() { return lastReplyAt; }
    public void setLastReplyAt(Instant lastReplyAt) { this.lastReplyAt = lastReplyAt; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
