package com.eha.forumservice.repository;

import com.eha.forumservice.model.ForumReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ForumReplyRepository extends JpaRepository<ForumReply, Long> {
    List<ForumReply> findByTopicIdAndStatusOrderByCreatedAtAsc(Long topicId, String status);
}
