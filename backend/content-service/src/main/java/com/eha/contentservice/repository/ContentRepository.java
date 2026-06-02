package com.eha.contentservice.repository;

import com.eha.contentservice.model.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {
    Page<Content> findByStatus(String status, Pageable pageable);
}
