package securehub.securehube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import securehub.securehube.model.ServiceRequest;
import securehub.securehube.repository.ServiceRequestRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ServiceRequestService {

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    public List<ServiceRequest> getAllServiceRequests() {
        return serviceRequestRepository.findAll();
    }

    public Map<String, Long> countProjectsByStatus() {
        List<Object[]> results = serviceRequestRepository.countProjectsByStatus();
        Map<String, Long> statusCounts = new HashMap<>();
        for (Object[] result : results) {
            statusCounts.put((String) result[0], ((Number) result[1]).longValue());
        }
        return statusCounts;
    }

    public void saveServiceRequest(ServiceRequest serviceRequest) {
        serviceRequestRepository.save(serviceRequest);
    }

    public List<Object[]> countProjectsByUser() {
        return serviceRequestRepository.countProjectsByUser();
    }

    public Optional<ServiceRequest> getServiceRequestById(Long id) {
        return serviceRequestRepository.findById(id);
    }

    public List<ServiceRequest> getServiceRequestsByCompanyName(String companyName) {
        return serviceRequestRepository.findByNomEntreprise(companyName);
    }

    public void deleteServiceRequest(Long id) {
        serviceRequestRepository.deleteById(id);
    }

    public ServiceRequest updateRequest(Long id, ServiceRequest serviceRequest) {
        if (serviceRequestRepository.existsById(id)) {
            serviceRequest.setId(id);
            return serviceRequestRepository.save(serviceRequest);
        } else {
            throw new IllegalArgumentException("ServiceRequest with id " + id + " does not exist.");
        }
    }

    public ServiceRequest createRequest(ServiceRequest serviceRequest) {
        return serviceRequestRepository.save(serviceRequest);
    }

    public List<ServiceRequest> getAllRequests() {
        return serviceRequestRepository.findAll();
    }
}
