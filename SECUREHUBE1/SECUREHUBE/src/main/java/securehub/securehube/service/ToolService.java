package securehub.securehube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import securehub.securehube.model.Tool;
import securehub.securehube.repository.FavoriteRepository;
import securehub.securehube.repository.ToolRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ToolService {
    @Autowired
    private ToolRepository toolRepository;
    @Autowired
    private FavoriteRepository favoriteRepository;

    public List<Tool> getAllTools() {
        return toolRepository.findAll();
    }

    public Tool addTool(Tool tool) {
        return toolRepository.save(tool);
    }

    public Map<Long, Long> getFavoritesCount() {
        List<Object[]> countData = favoriteRepository.countFavoritesByToolId();
        Map<Long, Long> favoritesCount = new HashMap<>();
        for (Object[] data : countData) {
            Long toolId = (Long) data[0];
            Long count = (Long) data[1];
            favoritesCount.put(toolId, count);
        }
        return favoritesCount;

    }

    public void deleteTool(Long id) {
        toolRepository.deleteById(id);
    }
}
