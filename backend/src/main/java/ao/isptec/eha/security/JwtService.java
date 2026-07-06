package ao.isptec.eha.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class JwtService {

    private final SecretKey key;
    private final long accessExpirationMs;
    private final long refreshExpirationMs;

    public JwtService(
            @Value("${eha.jwt.secret}") String secret,
            @Value("${eha.jwt.access-expiration-ms}") long accessExpirationMs,
            @Value("${eha.jwt.refresh-expiration-ms}") long refreshExpirationMs) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessExpirationMs = accessExpirationMs;
        this.refreshExpirationMs = refreshExpirationMs;
    }

    public String generateAccessToken(Long userId, String email, String role) {
        return buildToken(userId, Map.of("email", email, "role", role, "type", "access"), accessExpirationMs);
    }

    public String generateRefreshToken(Long userId) {
        return buildToken(userId, Map.of("type", "refresh"), refreshExpirationMs);
    }

    private String buildToken(Long userId, Map<String, ?> claims, long expirationMs) {
        Date now = new Date();
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claims().add(claims).and()
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expirationMs))
                .signWith(key)
                .compact();
    }

    /** Valida o token e devolve o id do utilizador; vazio se inválido/expirado. */
    public Optional<Long> parseUserId(String token, String expectedType) {
        try {
            Claims claims = Jwts.parser().verifyWith(key).build()
                    .parseSignedClaims(token)
                    .getPayload();
            if (!expectedType.equals(claims.get("type", String.class))) {
                return Optional.empty();
            }
            return Optional.of(Long.parseLong(claims.getSubject()));
        } catch (JwtException | NumberFormatException e) {
            return Optional.empty();
        }
    }
}
