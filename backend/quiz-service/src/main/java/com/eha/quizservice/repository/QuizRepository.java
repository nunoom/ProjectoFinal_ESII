package com.eha.quizservice.repository;

import com.eha.quizservice.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    
    @Query("SELECT q FROM Quiz q JOIN FETCH q.category WHERE q.status = 'ACTIVE'")
    List<Quiz> findAllActive();

    @Query("SELECT q FROM Quiz q JOIN FETCH q.category WHERE q.status = 'ACTIVE' AND q.category.slug = :categorySlug")
    List<Quiz> findActiveByCategory(@Param("categorySlug") String categorySlug);

    @Query("SELECT q FROM Quiz q JOIN FETCH q.category WHERE q.status = 'ACTIVE' AND q.difficulty = :difficulty")
    List<Quiz> findActiveByDifficulty(@Param("difficulty") String difficulty);

    @Query("SELECT q FROM Quiz q JOIN FETCH q.category WHERE q.status = 'ACTIVE' AND q.category.slug = :categorySlug AND q.difficulty = :difficulty")
    List<Quiz> findActiveByCategoryAndDifficulty(@Param("categorySlug") String categorySlug, @Param("difficulty") String difficulty);

    @Query("SELECT q FROM Quiz q LEFT JOIN FETCH q.questions WHERE q.id = :id")
    Optional<Quiz> findByIdWithQuestions(@Param("id") Long id);
}
