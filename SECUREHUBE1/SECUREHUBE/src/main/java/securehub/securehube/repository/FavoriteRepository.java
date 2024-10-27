package securehub.securehube.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import securehub.securehube.model.Favorite;
import java.util.List;
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long userId);
    void deleteByUserIdAndToolId(Long userId, Long toolId);

    @Query("SELECT f.toolId, COUNT(f) FROM Favorite f GROUP BY f.toolId")
    List<Object[]> countFavoritesByToolId();
    }


