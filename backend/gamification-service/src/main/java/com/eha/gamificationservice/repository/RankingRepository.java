package com.eha.gamificationservice.repository;

import com.eha.gamificationservice.model.Category;
import com.eha.gamificationservice.model.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RankingRepository extends JpaRepository<Ranking, Long> {

    @Query("SELECT r FROM Ranking r LEFT JOIN FETCH r.category WHERE r.periodType = :periodType AND r.category IS NULL ORDER BY r.points DESC")
    List<Ranking> findGlobalRankings(@Param("periodType") String periodType);

    @Query("SELECT r FROM Ranking r JOIN FETCH r.category WHERE r.periodType = :periodType AND r.category.slug = :categorySlug ORDER BY r.points DESC")
    List<Ranking> findCategoryRankings(@Param("periodType") String periodType, @Param("categorySlug") String categorySlug);

    Optional<Ranking> findByUserIdAndPeriodTypeAndCategoryIsNull(Long userId, String periodType);

    Optional<Ranking> findByUserIdAndPeriodTypeAndCategory(Long userId, String periodType, Category category);

    @Query("SELECT SUM(r.points) FROM Ranking r WHERE r.userId = :userId AND r.category IS NULL AND r.periodType = 'GLOBAL'")
    Integer sumPointsByUserId(@Param("userId") Long userId);
}
