package securehub.securehube.controler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import securehub.securehube.model.Favorite;
import securehub.securehube.service.FavoriteService;

import java.util.List;
@RestController
@RequestMapping("/api/user/favorites")
@CrossOrigin(origins = "http://localhost:3000")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;
    @GetMapping
    public ResponseEntity<List<Favorite>> getFavorites(@RequestParam Long userId) {
        try {
            List<Favorite> favorites = favoriteService.getFavoritesByUserId(userId);
            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PostMapping
    public ResponseEntity<String> saveFavorite(@RequestBody Favorite favorite) {
        try {
            favoriteService.saveFavorite(favorite);
            return ResponseEntity.ok("Favorite saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving favorite");
        }
    }
    @DeleteMapping
    public ResponseEntity<String> deleteFavorite(@RequestParam Long userId, @RequestParam Long toolId) {
        try {
            favoriteService.deleteFavorite(userId, toolId);
            return ResponseEntity.ok("Favorite removed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing favorite");
        }
    }
}
