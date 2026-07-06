package com.eha.forumservice.repository;

import com.eha.forumservice.model.ForumTopic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumTopicRepository extends JpaRepository<ForumTopic, Long> {

    @Query("SELECT t FROM ForumTopic t JOIN FETCH t.category WHERE t.status = 'ACTIVE'")
    Page<ForumTopic> findAllActive(Pageable pageable);

    @Query("SELECT t FROM ForumTopic t JOIN FETCH t.category WHERE t.status = 'ACTIVE' AND t.category.slug = :categorySlug")
    Page<ForumTopic> findActiveByCategory(@Param("categorySlug") String categorySlug, Pageable pageable);
}
