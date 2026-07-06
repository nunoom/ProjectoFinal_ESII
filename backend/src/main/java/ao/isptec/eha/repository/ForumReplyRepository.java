package ao.isptec.eha.repository;

import ao.isptec.eha.model.ForumReply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ForumReplyRepository extends JpaRepository<ForumReply, Long> {
    List<ForumReply> findByTopicIdOrderByCreatedAtAsc(Long topicId);
    long countByTopicId(Long topicId);
}
