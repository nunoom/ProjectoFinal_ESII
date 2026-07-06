package ao.isptec.eha.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "contents")
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String summary;

    @Lob
    @Column(nullable = false)
    private String body;

    private String imageUrl;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private int readTime;

    @Column(nullable = false)
    private long views = 0;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public Content() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getReadTime() { return readTime; }
    public void setReadTime(int readTime) { this.readTime = readTime; }
    public long getViews() { return views; }
    public void setViews(long views) { this.views = views; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
