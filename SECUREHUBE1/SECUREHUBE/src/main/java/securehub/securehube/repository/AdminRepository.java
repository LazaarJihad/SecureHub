package securehub.securehube.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import securehub.securehube.model.Admin;
import org.springframework.stereotype.Repository;
// AdminRepository.java
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUserId(Long userId);
}
