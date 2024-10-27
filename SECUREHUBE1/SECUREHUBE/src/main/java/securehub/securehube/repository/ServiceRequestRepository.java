package securehub.securehube.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import securehub.securehube.model.ServiceRequest;

import java.util.List;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByNomEntreprise(String nomEntreprise);
    @Query("SELECT s.status, COUNT(s) FROM ServiceRequest s GROUP BY s.status")
    List<Object[]> countProjectsByStatus();

    @Query("SELECT s.nomEntreprise, COUNT(s) FROM ServiceRequest s GROUP BY s.nomEntreprise")
    List<Object[]> countProjectsByUser();


}
