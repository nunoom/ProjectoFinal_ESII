package ao.isptec.eha.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "forum_replies")
public class ForumReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "topic_id")
    private ForumTopic topic;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id")
    private User author;

    @Column(nullable = false, length = 4000)
    private String content;

    @Column(nullable = false)
    private int likes = 0;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public ForumReply() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public ForumTopic getTopic() { return topic; }
    public void setTopic(ForumTopic topic) { this.topic = topic; }
    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
