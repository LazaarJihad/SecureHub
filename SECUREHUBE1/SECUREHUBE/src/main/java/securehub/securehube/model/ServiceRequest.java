package securehub.securehube.model;

import jakarta.persistence.*;

@Entity
@Table(name = "service_requests")
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomEntreprise;
    private String adresse;
    private String ville;
    private String codePostal;
    private String pays;
    private String contactPrincipal;
    private String telephone;
    private String email;
    private String typeService;
    private String descriptionService;
    private String objectifService;
    private String etendueService;
    private String frequenceService;
    private String dateDebutService;
    private String dureeEstimee;
    private String conditionsSpecifiques;
    private String certificationRequise;
    private String rapportsDocumentation;
    private String budgetAlloue;
    private String autresInformations;
    private String status;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomEntreprise() {
        return nomEntreprise;
    }

    public void setNomEntreprise(String nomEntreprise) {
        this.nomEntreprise = nomEntreprise;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getContactPrincipal() {
        return contactPrincipal;
    }

    public void setContactPrincipal(String contactPrincipal) {
        this.contactPrincipal = contactPrincipal;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    @Column(nullable = false)
    private boolean isSeen = false;

    public boolean isSeen() {
        return isSeen;
    }

    public void setSeen(boolean seen) {
        isSeen = seen;
    }

    public String getTypeService() {
        return typeService;
    }

    public void setTypeService(String typeService) {
        this.typeService = typeService;
    }

    public String getDescriptionService() {
        return descriptionService;
    }

    public void setDescriptionService(String descriptionService) {
        this.descriptionService = descriptionService;
    }

    public String getObjectifService() {
        return objectifService;
    }

    public void setObjectifService(String objectifService) {
        this.objectifService = objectifService;
    }

    public String getEtendueService() {
        return etendueService;
    }

    public void setEtendueService(String etendueService) {
        this.etendueService = etendueService;
    }

    public String getFrequenceService() {
        return frequenceService;
    }

    public void setFrequenceService(String frequenceService) {
        this.frequenceService = frequenceService;
    }

    public String getDateDebutService() {
        return dateDebutService;
    }

    public void setDateDebutService(String dateDebutService) {
        this.dateDebutService = dateDebutService;
    }

    public String getDureeEstimee() {
        return dureeEstimee;
    }

    public void setDureeEstimee(String dureeEstimee) {
        this.dureeEstimee = dureeEstimee;
    }

    public String getConditionsSpecifiques() {
        return conditionsSpecifiques;
    }

    public void setConditionsSpecifiques(String conditionsSpecifiques) {
        this.conditionsSpecifiques = conditionsSpecifiques;
    }

    public String getCertificationRequise() {
        return certificationRequise;
    }

    public void setCertificationRequise(String certificationRequise) {
        this.certificationRequise = certificationRequise;
    }

    public String getRapportsDocumentation() {
        return rapportsDocumentation;
    }

    public void setRapportsDocumentation(String rapportsDocumentation) {
        this.rapportsDocumentation = rapportsDocumentation;
    }

    public String getBudgetAlloue() {
        return budgetAlloue;
    }

    public void setBudgetAlloue(String budgetAlloue) {
        this.budgetAlloue = budgetAlloue;
    }

    public String getAutresInformations() {
        return autresInformations;
    }

    public void setAutresInformations(String autresInformations) {
        this.autresInformations = autresInformations;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}