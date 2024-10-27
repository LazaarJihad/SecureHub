package securehub.securehube.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import securehub.securehube.model.Favorite;
import securehub.securehube.repository.FavoriteRepository;

import java.util.List;
@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;
    public List<Favorite> getFavoritesByUserId(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }
    public void saveFavorite(Favorite favorite) {
        favoriteRepository.save(favorite);
    }
    public void deleteFavorite(Long userId, Long toolId) {
        favoriteRepository.deleteByUserIdAndToolId(userId, toolId);
    }
}
