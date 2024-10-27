package securehub.securehube.service;

import securehub.securehube.model.User;
import securehub.securehube.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User registerUser(User user) {
        if ("admin".equals(user.getUsername())) { // Exemple simple pour définir un administrateur
            user.setRole("ROLE_ADMIN");
        } else {
            user.setRole("ROLE_USER");
        }
        return userRepository.save(user);
    }
    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            System.out.println("User role: " + user.getRole()); // Ajout de logs
            return user;
        }
        throw new RuntimeException("Invalid username or password");
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public User findById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}


