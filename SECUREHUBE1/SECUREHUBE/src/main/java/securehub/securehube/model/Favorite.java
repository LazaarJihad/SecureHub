package securehub.securehube.model;
import jakarta.persistence.*;
@Entity
@Table(name = "favorites")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long toolId;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public Long getToolId() {
        return toolId;
    }
    public void setToolId(Long toolId) {
        this.toolId = toolId;
    }
}
