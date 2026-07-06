package ao.isptec.eha.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "users")
public class User {

    public enum Role { USER, MODERATOR, ADMIN }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    private String photoUrl;

    @Column(length = 500)
    private String bio;

    @Column(nullable = false)
    private int points = 0;

    @Column(nullable = false)
    private int level = 1;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    @Column(nullable = false)
    private boolean emailVerified = false;

    private String verificationCode;

    private Instant verificationExpiresAt;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public User() {}

    public User(String name, String email, String passwordHash) {
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public void addPoints(int earned) {
        this.points += earned;
        this.level = this.points / 100 + 1;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }
    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public boolean isEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }
    public String getVerificationCode() { return verificationCode; }
    public void setVerificationCode(String verificationCode) { this.verificationCode = verificationCode; }
    public Instant getVerificationExpiresAt() { return verificationExpiresAt; }
    public void setVerificationExpiresAt(Instant verificationExpiresAt) { this.verificationExpiresAt = verificationExpiresAt; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
