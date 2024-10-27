import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ManageUsers.css';

const ManageUsers = () => {
  const [userRoleUsers, setUserRoleUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8083/api/users')
      .then(response => {
        setUserRoleUsers(response.data.filter(user => user.role === 'ROLE_USER'));
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8083/api/users/${id}`)
      .then(() => {
        setUserRoleUsers(userRoleUsers.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8083/api/users/${editingUser.id}`, editingUser)
      .then(() => {
        setUserRoleUsers(userRoleUsers.map(user =>
          user.id === editingUser.id ? editingUser : user
        ));
        alert('Utilisateur modifié avec succès');
        handleModalClose();
      })
      .catch(error => {
        console.error('There was an error updating the user!', error);
        alert('Échec de la modification de l\'utilisateur');
      });
  };

  return (
    <div className="table-container">
      <h2>Les Utilisateurs</h2>
      <table className="user-role-table">
        <thead>
          <tr>
            <th>Initiale</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userRoleUsers.map(user => (
            <tr key={user.id}>
              <td>
                <div className="initial-circle">{user.username.charAt(0).toUpperCase()}</div>
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="action-column">
                <div className="action-icons">
                  <button className="btn-edit" onClick={() => handleEdit(user)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(user.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && editingUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Modifier l'utilisateur</h2>
            <form onSubmit={handleModalSubmit}>
              <label>
                Nom d'utilisateur:
                <input
                  type="text"
                  name="username"
                  value={editingUser.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Mot de passe:
                <input
                  type="password"
                  name="password"
                  value={editingUser.password}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Sauvegarder</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
