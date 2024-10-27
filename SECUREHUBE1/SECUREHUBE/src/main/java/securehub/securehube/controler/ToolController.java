package securehub.securehube.controler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import securehub.securehube.model.Tool;
import securehub.securehube.repository.ToolRepository;
import securehub.securehube.service.ToolService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;
@CrossOrigin(origins = "http://localhost:3000")  // Ajoutez cette annotation à votre classe de contrôleur
@RestController
@RequestMapping("/api/tools")
public class ToolController {
    @Autowired
    private ToolService toolService;
    @Autowired
    private ToolRepository toolRepository;

    @GetMapping
    public List<Tool> getAllTools() {
        return toolService.getAllTools();
    }

    @GetMapping("/favorites-count")
    public ResponseEntity<Map<Long, Long>> getFavoritesCount() {
        Map<Long, Long> favoritesCount = toolService.getFavoritesCount();
        return ResponseEntity.ok(favoritesCount);
    }
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Long>> getStatistics() {
        Map<Long, Long> favoritesCount = toolService.getFavoritesCount();
        List<Tool> tools = toolService.getAllTools();

        long totalTools = tools.size();
        long totalFavorites = favoritesCount.values().stream().mapToLong(Long::longValue).sum();

        Map<String, Long> statistics = new HashMap<>();
        statistics.put("totalTools", totalTools);
        statistics.put("totalFavorites", totalFavorites);

        return ResponseEntity.ok(statistics);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTool(@PathVariable Long id) {
        toolService.deleteTool(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping
    public ResponseEntity<Tool> addTool(@RequestBody Tool tool) {
        try {
            Tool savedTool = toolRepository.save(tool);
            return ResponseEntity.ok(savedTool);
        } catch (Exception e) {
            System.err.println("Erreur lors de l'ajout de l'outil : " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}


