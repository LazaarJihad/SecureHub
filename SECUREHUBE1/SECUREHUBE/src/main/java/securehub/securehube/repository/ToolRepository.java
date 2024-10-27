package securehub.securehube.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import securehub.securehube.model.Tool;

public interface ToolRepository extends JpaRepository<Tool, Long> {
}
