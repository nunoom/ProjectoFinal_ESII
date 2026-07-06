package com.eha.authservice.repository;

import com.eha.authservice.model.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthUserRepository extends JpaRepository<AuthUser, Long> {
    Optional<AuthUser> findByEmail(String email);
    Optional<AuthUser> findByEmailConfirmationToken(String token);
    Optional<AuthUser> findByPasswordResetToken(String token);
    boolean existsByEmail(String email);
}
