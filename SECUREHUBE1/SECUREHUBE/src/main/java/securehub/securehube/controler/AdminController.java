package securehub.securehube.controler;

import org.springframework.http.ResponseEntity;
import securehub.securehube.model.Admin;
import securehub.securehube.model.User;
import securehub.securehube.service.UserService;
import securehub.securehube.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/add")
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }
    @GetMapping("/info/{userId}")
    public ResponseEntity<Admin> getAdminInfo(@PathVariable Long userId) {
        Admin admin = adminService.getAdminByUserId(userId);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
