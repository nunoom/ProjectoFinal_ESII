package com.eha.authservice.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenProvider {

    private final byte[] secret;
    private final long expiration;
    private final long refreshExpiration;

    public JwtTokenProvider(
        @Value("${jwt.secret}") String secret,
        @Value("${jwt.expiration}") long expiration,
        @Value("${jwt.refresh-expiration}") long refreshExpiration
    ) {
        this.secret = secret.getBytes(StandardCharsets.UTF_8);
        this.expiration = expiration;
        this.refreshExpiration = refreshExpiration;
    }

    public String generateAccessToken(Long userId, String role) {
        Instant now = Instant.now();
        return Jwts.builder()
            .setSubject(String.valueOf(userId))
            .addClaims(Map.of("userId", userId, "role", role))
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(now.plusMillis(expiration)))
            .signWith(Keys.hmacShaKeyFor(secret), SignatureAlgorithm.HS256)
            .compact();
    }

    public Instant refreshExpiry() {
        return Instant.now().plusMillis(refreshExpiration);
    }
}
