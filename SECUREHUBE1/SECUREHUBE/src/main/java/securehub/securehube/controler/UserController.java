package securehub.securehube.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import securehub.securehube.model.User;
import securehub.securehube.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000") // Adjust the URL as needed
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @PutMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }
    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000") // Adjust the URL as needed
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }






}
