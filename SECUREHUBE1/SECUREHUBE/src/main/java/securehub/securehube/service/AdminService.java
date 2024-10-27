package securehub.securehube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import securehub.securehube.model.Admin;
import securehub.securehube.repository.AdminRepository;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    public Admin getAdminByUserId(Long userId) {
        return adminRepository.findByUserId(userId);
    }
    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin); // Assurez-vous d'enregistrer l'admin dans la base de données
    }
}