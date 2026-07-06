package ao.isptec.eha.repository;

import ao.isptec.eha.model.ForumTopic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ForumTopicRepository extends JpaRepository<ForumTopic, Long> {
    List<ForumTopic> findByCategoryOrderByCreatedAtDesc(String category);
    List<ForumTopic> findAllByOrderByCreatedAtDesc();
}
