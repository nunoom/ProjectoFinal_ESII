package com.eha.forumservice.repository;

import com.eha.forumservice.model.ForumReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumReportRepository extends JpaRepository<ForumReport, Long> {
}
