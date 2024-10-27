package securehub.securehube.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import securehub.securehube.model.ServiceRequest;
import securehub.securehube.service.ServiceRequestService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/service-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService serviceRequestService;

    @GetMapping
    public List<ServiceRequest> getAllServiceRequests() {
        return serviceRequestService.getAllServiceRequests();
    }

    @PostMapping
    public ResponseEntity<String> createServiceRequest(@RequestBody ServiceRequest serviceRequest) {
        try {
            serviceRequestService.saveServiceRequest(serviceRequest);
            return ResponseEntity.ok("Service request submitted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to submit service request. Error: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<String> updateServiceRequestStatus(@PathVariable Long id, @RequestBody String status) {
        try {
            Optional<ServiceRequest> optionalServiceRequest = serviceRequestService.getServiceRequestById(id);
            if (optionalServiceRequest.isPresent()) {
                ServiceRequest serviceRequest = optionalServiceRequest.get();
                serviceRequest.setStatus(status);
                serviceRequestService.saveServiceRequest(serviceRequest);
                return ResponseEntity.ok("Service request status updated successfully.");
            } else {
                return ResponseEntity.status(404).body("Service request not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update service request status. Error: " + e.getMessage());
        }
    }

    @GetMapping("/count-projects-by-user")
    public List<Object[]> countProjectsByUser() {
        return serviceRequestService.countProjectsByUser();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceRequest> getServiceRequestById(@PathVariable Long id) {
        return serviceRequestService.getServiceRequestById(id)
                .map(serviceRequest -> ResponseEntity.ok().body(serviceRequest))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/details")
    public List<ServiceRequest> getServiceRequestsByCompanyName(@RequestParam("nomEntreprise") String nomEntreprise) {
        return serviceRequestService.getServiceRequestsByCompanyName(nomEntreprise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateServiceRequest(@PathVariable Long id, @RequestBody ServiceRequest updatedRequest) {
        try {
            Optional<ServiceRequest> optionalServiceRequest = serviceRequestService.getServiceRequestById(id);
            if (optionalServiceRequest.isPresent()) {
                ServiceRequest serviceRequest = optionalServiceRequest.get();
                // Update fields
                serviceRequest.setNomEntreprise(updatedRequest.getNomEntreprise());
                serviceRequest.setAdresse(updatedRequest.getAdresse());
                serviceRequest.setVille(updatedRequest.getVille());
                serviceRequest.setCodePostal(updatedRequest.getCodePostal());
                serviceRequest.setPays(updatedRequest.getPays());
                serviceRequest.setContactPrincipal(updatedRequest.getContactPrincipal());
                serviceRequest.setTelephone(updatedRequest.getTelephone());
                serviceRequest.setEmail(updatedRequest.getEmail());
                serviceRequest.setTypeService(updatedRequest.getTypeService());
                serviceRequest.setDescriptionService(updatedRequest.getDescriptionService());
                serviceRequest.setObjectifService(updatedRequest.getObjectifService());
                serviceRequest.setEtendueService(updatedRequest.getEtendueService());
                serviceRequest.setFrequenceService(updatedRequest.getFrequenceService());
                serviceRequest.setDateDebutService(updatedRequest.getDateDebutService());
                serviceRequest.setDureeEstimee(updatedRequest.getDureeEstimee());
                serviceRequest.setConditionsSpecifiques(updatedRequest.getConditionsSpecifiques());
                serviceRequest.setCertificationRequise(updatedRequest.getCertificationRequise());
                serviceRequest.setRapportsDocumentation(updatedRequest.getRapportsDocumentation());
                serviceRequest.setBudgetAlloue(updatedRequest.getBudgetAlloue());
                serviceRequest.setAutresInformations(updatedRequest.getAutresInformations());
                serviceRequest.setStatus(updatedRequest.getStatus());

                serviceRequestService.saveServiceRequest(serviceRequest);
                return ResponseEntity.ok("Service request updated successfully.");
            } else {
                return ResponseEntity.status(404).body("Service request not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update service request. Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteServiceRequest(@PathVariable Long id) {
        try {
            Optional<ServiceRequest> optionalServiceRequest = serviceRequestService.getServiceRequestById(id);
            if (optionalServiceRequest.isPresent()) {
                serviceRequestService.deleteServiceRequest(id);
                return ResponseEntity.ok("Service request deleted successfully.");
            } else {
                return ResponseEntity.status(404).body("Service request not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to delete service request. Error: " + e.getMessage());
        }
    }

    @GetMapping("/count-projects-by-status")
    public ResponseEntity<Map<String, Long>> countProjectsByStatus() {
        try {
            Map<String, Long> counts = serviceRequestService.countProjectsByStatus();
            return ResponseEntity.ok(counts);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
