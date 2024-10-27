import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ProjectDetails.css';

const ProjectDetails = ({ companyName }) => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchServiceRequests();
  }, [companyName]);

  const fetchServiceRequests = () => {
    axios.get(`http://localhost:8083/api/service-requests/details?nomEntreprise=${encodeURIComponent(companyName)}`)
      .then(response => {
        setServiceRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching service requests:', error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande de service ?')) {
      axios.delete(`http://localhost:8083/api/service-requests/${id}`)
        .then(() => {
          fetchServiceRequests();
          alert('Demande de service supprimée avec succès');
        })
        .catch(error => {
          console.error('Error deleting service request:', error);
          alert('Échec de la suppression de la demande de service');
        });
    }
  };

  const handleEdit = (request) => {
    setEditingRequest(request);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingRequest(null);
  };

  const handleModalSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8083/api/service-requests/${editingRequest.id}`, editingRequest)
      .then(() => {
        fetchServiceRequests();
        alert('Demande de service modifiée avec succès');
        handleModalClose();
      })
      .catch(error => {
        console.error('Error updating service request:', error);
        alert('Échec de la modification de la demande de service');
      });
  };

  const handleStatusChange = (id, newStatus) => {
    axios.patch(`http://localhost:8083/api/service-requests/${id}/status`, { status: newStatus })
      .then(() => {
        // Update the local state to reflect the change immediately
        setServiceRequests(prevRequests => 
          prevRequests.map(request =>
            request.id === id ? { ...request, status: newStatus } : request
          )
        );
        alert('Statut mis à jour avec succès');
      })
      .catch(error => {
        console.error('Error updating status:', error);
        alert('Échec de la mise à jour du statut');
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingRequest(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Terminé':
        return 'status-completed';
      case 'En cours':
        return 'status-in-progress';
      case 'Non commencé':
        return 'status-not-started';
      case 'Non défini':
        return 'status-default';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="table-container">
      <h2>Détails des projets pour {companyName}</h2>
      <div className="table-wrapper">
        <table className="project-details-table">
          <thead>
            <tr>
              <th>Nom Entreprise</th>
              <th>Email</th>
              <th>Pays</th>
              <th>Téléphone</th>
              <th>Ville</th>
              <th>Adresse</th>
              <th>Téléphone du Responsable</th>
              <th>Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map(request => (
              <tr key={request.id}>
                <td>{request.nomEntreprise}</td>
                <td>{request.email}</td>
                <td>{request.pays}</td>
                <td>{request.telephone}</td>
                <td>{request.ville}</td>
                <td>{request.adresse}</td>
                <td>{request.telephone}</td>
                <td>{request.service}</td>
                <td className={getStatusClass(request.status)}>
                  <select
                    value={request.status || 'Non défini'}
                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="Non défini">Non défini</option>
                    <option value="Terminé">Terminé</option>
                    <option value="En cours">En cours</option>
                    <option value="Non commencé">Non commencé</option>
                  </select>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(request)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(request.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && editingRequest && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Modifier la demande de service</h2>
            <form onSubmit={handleModalSubmit}>
              <label>
                Nom Entreprise:
                <input
                  type="text"
                  name="nomEntreprise"
                  value={editingRequest.nomEntreprise}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editingRequest.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Pays:
                <input
                  type="text"
                  name="pays"
                  value={editingRequest.pays}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Téléphone:
                <input
                  type="text"
                  name="telephone"
                  value={editingRequest.telephone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Ville:
                <input
                  type="text"
                  name="ville"
                  value={editingRequest.ville}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Adresse:
                <input
                  type="text"
                  name="adresse"
                  value={editingRequest.adresse}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Date Début:
                <input
                  type="date"
                  name="dateDebutService"
                  value={editingRequest.telephone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Type de Service:
                <input
                  type="text"
                  name="typeService"
                  value={editingRequest.typeService}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Statut:
                <select
                  name="status"
                  value={editingRequest.status || 'Non défini'}
                  onChange={handleInputChange}
                >
                  <option value="Non défini">Non défini</option>
                  <option value="Terminé">Terminé</option>
                  <option value="En cours">En cours</option>
                  <option value="Non commencé">Non commencé</option>
                </select>
              </label>
              <button type="submit">Enregistrer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
