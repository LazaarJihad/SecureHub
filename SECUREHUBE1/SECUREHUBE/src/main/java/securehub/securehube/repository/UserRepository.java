package securehub.securehube.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import securehub.securehube.model.User;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
}
