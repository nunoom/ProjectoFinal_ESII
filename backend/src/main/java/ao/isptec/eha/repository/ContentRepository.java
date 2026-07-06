package ao.isptec.eha.repository;

import ao.isptec.eha.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ContentRepository extends JpaRepository<Content, Long>, JpaSpecificationExecutor<Content> {
}
