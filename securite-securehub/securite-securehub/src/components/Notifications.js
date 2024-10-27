import React, { useEffect, useState } from 'react';
import './Notification.css';
import logo from '../assets/logo.png';

const Notifications = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8083/api/service-requests');
                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                setError('Erreur lors du chargement des projets. Veuillez réessayer plus tard.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setShowInvoice(false);
    };

    const handleAccept = () => {
        setShowInvoice(true);
    };

    const handleReject = async () => {
        if (selectedProject) {
            try {
                const response = await fetch(`http://localhost:8083/api/service-requests/${selectedProject.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression du projet.');
                }

                setProjects(projects.filter(project => project.id !== selectedProject.id));
                setSelectedProject(null);
                setShowInvoice(false);
                setAlertMessage('Le projet a été supprimé avec succès.');
                setTimeout(() => {
                    setAlertMessage(null);
                }, 5000);
            } catch (error) {
                setAlertMessage('Erreur lors de la suppression du projet. Veuillez réessayer plus tard.');
                setTimeout(() => setAlertMessage(null), 5000);
            }
        }
    };

    const calculateTotal = () => {
        const taxRate = 20; // Taux de taxe fixe à 20%
        const total = quantity * unitPrice * (1 + taxRate / 100);
        return total.toFixed(2);
    };

    const handleSendInvoice = async () => {
        if (selectedProject) {
            const invoiceDetails = {
                projectId: selectedProject.id,
                quantity,
                unitPrice,
                total: calculateTotal(),
                dueDate,
            };

            try {
                const response = await fetch('http://localhost:8083/invoices', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(invoiceDetails),
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de l\'envoi de la facture.');
                }

                setAlertMessage('La facture a été envoyée avec succès.');
                setTimeout(() => {
                    setAlertMessage(null);
                }, 5000);
                setShowInvoice(false);
                setSelectedProject(null);
            } catch (error) {
                setAlertMessage('Erreur lors de l\'envoi de la facture. Veuillez réessayer plus tard.');
                setTimeout(() => setAlertMessage(null), 5000);
            }
        }
    };

    if (isLoading) {
        return <div style={{ textAlign: 'center', fontSize: '1.2em' }}>Chargement...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', color: '#dc3545' }}>{error}</div>;
    }

    return (
        <div style={styles.container}>
            {alertMessage && (
                <div style={styles.alertContainer}>
                    <button
                        style={styles.closeButton}
                        onClick={() => setAlertMessage(null)}
                    >
                        &times;
                    </button>
                    {alertMessage}
                </div>
            )}

            {!selectedProject && !showInvoice && (
                <div style={styles.projectList}>
                    {projects.map(project => (
                        <div
                            key={project.id}
                            style={styles.projectCard}
                            onClick={() => handleProjectClick(project)}
                        >
                            <div style={styles.companyCircle}>
                                {project.nomEntreprise.charAt(0)}
                            </div>
                            <div style={styles.projectCardContent}>
                                <h3>{project.nomEntreprise}</h3>
                                <p>{project.service}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedProject && !showInvoice && (
                <div style={styles.detailsContainer}>
                    <div style={styles.detailsCard}>
                        <div style={styles.logoContainer}>
                            <img src={logo} alt="Company Logo" style={styles.logo} />
                        </div>
                        <h2>Détails du Projet</h2>
                        <div style={styles.detailsText}>
                            <p><strong>Nom de l'Entreprise:</strong> {selectedProject.nomEntreprise || 'Non disponible'}</p>
                            <p><strong>Nom du Responsable:</strong> {selectedProject.nomResponsable || 'Non disponible'}</p>
                            <p><strong>Adresse:</strong> {selectedProject.adresse || 'Non disponible'}</p>
                            <p><strong>Ville:</strong> {selectedProject.ville || 'Non disponible'}</p>
                            <p><strong>Pays:</strong> {selectedProject.pays || 'Non disponible'}</p>
                            <p><strong>Contact Principal:</strong> {selectedProject.contactPrincipal || 'Non disponible'}</p>
                            <p><strong>Téléphone:</strong> {selectedProject.telephone || 'Non disponible'}</p>
                            <p><strong>Email:</strong> {selectedProject.email || 'Non disponible'}</p>
                            <p><strong>Durée Estimée:</strong> {selectedProject.dureeEstimee || 'Non disponible'}</p>
                            <p><strong>Service:</strong> {selectedProject.service || 'Non disponible'}</p>
                            <p><strong>Description du Service:</strong> {selectedProject.descriptionService || 'Non disponible'}</p>
                            <p><strong>Objectif du Service:</strong> {selectedProject.objectifService || 'Non disponible'}</p>
                            <p><strong>Conditions Spécifiques:</strong> {selectedProject.conditionsSpecifiques || 'Non disponible'}</p>
                        </div>
                        <div style={styles.buttonContainerCentered}>
                            <button 
                                style={{ ...styles.button, ...styles.buttonAccepted }} 
                                onClick={handleAccept}
                            >
                                Accepter
                            </button>
                            <button 
                                style={{ ...styles.button, ...styles.buttonRejected }} 
                                onClick={handleReject}
                            >
                                Refuser
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showInvoice && selectedProject && (
                <div style={styles.invoiceContainer}>
                    <header style={styles.invoiceHeader}>
                        <img src={logo} alt="Company Logo" style={styles.logo} />
                        <h1>Facture</h1>
                        <div style={styles.invoiceNumber}>Numéro de Facture: {Math.floor(Math.random() * 10000)}</div>
                    </header>
                    <section style={styles.invoiceDetails}>
                        <div><strong>Nom de l'Entreprise:</strong> SecureHub</div>
                        <div><strong>Adresse de l'Entreprise:</strong> SecureHub</div>
                        <div><strong>Date d'Émission:</strong> {new Date().toLocaleDateString()}</div>
                        <div><strong>Date d'Expiration:</strong></div>
                        <input 
                            type="date" 
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)} 
                            style={styles.input} 
                        />
                        <div><strong>Nom du Responsable:</strong> {selectedProject.nomResponsable || 'Non disponible'}</div>
                        <div><strong>Adresse:</strong> {selectedProject.adresse || 'Non disponible'}</div>
                    </section>
                    <section style={styles.invoiceItems}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Description</th>
                                    <th style={styles.th}>Quantité</th>
                                    <th style={styles.th}>Prix Unitaire</th>
                                    <th style={styles.th}>Taux de Taxe (%)</th>
                                    <th style={styles.th}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{selectedProject.service}</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={quantity} 
                                            onChange={(e) => setQuantity(e.target.value)} 
                                            style={styles.input} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={unitPrice} 
                                            onChange={(e) => setUnitPrice(e.target.value)} 
                                            style={styles.input} 
                                        />
                                    </td>
                                    <td>20%</td>
                                    <td>{calculateTotal()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <div style={styles.buttonContainer}>
                        <button style={styles.button} onClick={handleSendInvoice}>Envoyer la Facture</button>
                        <button style={styles.button} onClick={() => setShowInvoice(false)}>Retour</button>
                    </div>
                </div>
            )}
        </div>
    );
};
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    alertContainer: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#f8d7da',
        padding: '10px',
        borderRadius: '5px',
        color: '#721c24',
        border: '1px solid #f5c6cb',
        zIndex: 1000,
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        fontSize: '1.2em',
        fontWeight: 'bold',
        float: 'right',
    },
    projectList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    projectCard: {
        background: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '10px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        width: '300px',
    },
    projectCardContent: {
        marginTop: '10px',
        textAlign: 'center',
    },
    companyCircle: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5em',
        margin: '0 auto',
    },
    detailsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    detailsCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        textAlign: 'left',
        width: '500px',
    },
    detailsText: {
        marginTop: '20px',
        fontSize: '16px',
        lineHeight: '1.6',
    },
    buttonContainerCentered: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        marginRight: '10px',
    },
    buttonAccepted: {
        backgroundColor: '#28a745',
        color: '#fff',
    },
    buttonRejected: {
        backgroundColor: '#dc3545',
        color: '#fff',
    },
    invoiceContainer: {
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        borderRadius: '10px',
        width: '70%',
        margin: '20px auto',
    },
    invoiceHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    logo: {
        width: '150px',
        height: 'auto',
    },
    invoiceDetails: {
        marginBottom: '20px',
    },
    invoiceItems: {
        width: '100%',
        marginBottom: '20px',
    },
    invoiceNumber: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    invoiceFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    input: {
        padding: '8px',
        margin: '5px 0',
        width: '100%',
        boxSizing: 'border-box',
    },
    buttonSend: {
        backgroundColor: '#007bff',
        color: '#fff',
    },
    th: {
        padding: '8px',
        backgroundColor: '#007bff',
        color: '#fff',
    },
};

export default Notifications;