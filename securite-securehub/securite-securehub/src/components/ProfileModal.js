import React, { useState } from 'react';

const ProfileModal = ({ currentAdmin, onClose }) => {
  // Etats pour gérer les informations de l'admin actuel
  const [username, setUsername] = useState(currentAdmin.username);
  const [email, setEmail] = useState(currentAdmin.email);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(currentAdmin.role);
  
  // Etats pour gérer les informations du nouvel admin
  const [newAdmin, setNewAdmin] = useState({ username: '', email: '', password: '' });

  const handleUpdateAdmin = () => {
    // Logique pour mettre à jour l'admin dans la base de données
    console.log('Admin mis à jour:', { username, email, password, role });
    onClose();
  };

  const handleAddAdmin = () => {
    // Logique pour ajouter le nouvel admin à la base de données
    console.log('Nouvel Admin:', newAdmin);
    onClose();
  };

  return (
    <div className="profile-modal">
      <div className="profile-modal-content">
        <h2>Profile</h2>

        {/* Section pour mettre à jour l'admin actuel */}
        <h3>Mettre à jour l'admin</h3>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Rôle"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={handleUpdateAdmin}>Mettre à jour</button>

        {/* Section pour ajouter un nouvel admin */}
        <h3>Ajouter un nouvel admin</h3>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={newAdmin.username}
          onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={newAdmin.password}
          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
        />
        <button onClick={handleAddAdmin}>Ajouter Admin</button>

        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default ProfileModal;
