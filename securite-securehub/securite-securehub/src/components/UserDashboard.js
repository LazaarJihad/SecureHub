import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTools, faFileAlt, faHeart, faUserCircle, faListAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import ThemeSwitcher from './ThemeSwitcher';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.username : 'Utilisateur';
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPath === '/user-dashboard/favorites') {
      axios.get('/api/user/favorites')
        .then(response => setFavorites(response.data))
        .catch(error => console.error(error));
    }
  }, [currentPath]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-logo-container">
          <img src={logo} alt="SecureHub Logo" className="dashboard-logo" />
          <span className="dashboard-user-info">Bonjour, {username} !</span>
        </div>
        <div className="dashboard-actions">
          <ThemeSwitcher />
          <FontAwesomeIcon icon={faUserCircle} className="dashboard-profile-icon" />
        </div>
      </header>
      <aside className="dashboard-sidebar">
        <ul>
          <li><Link to="/user-dashboard"><FontAwesomeIcon icon={faHome} />&nbsp;&nbsp;Tableau de bord</Link></li>
          <li><Link to="/user-dashboard/demandes-de-service"><FontAwesomeIcon icon={faListAlt} />&nbsp;&nbsp;Demandes de service</Link></li>
          <li><Link to="/user-dashboard/tools"><FontAwesomeIcon icon={faTools} />&nbsp;&nbsp;Service de sécurité</Link></li>
          <li><Link to="/user-dashboard/devis"><FontAwesomeIcon icon={faClipboardList} />&nbsp;&nbsp;Devis</Link></li>
          <li><Link to="/user-dashboard/favorites"><FontAwesomeIcon icon={faHeart} />&nbsp;&nbsp;Favoris</Link></li>
        </ul>
        <button className="dashboard-logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faUserCircle} />&nbsp;&nbsp;Déconnexion
        </button>
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
