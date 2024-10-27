import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import defaultProfileImage from '../assets/profile.png';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUserCog, faTools,
  faProjectDiagram, faBell, faUser, faSignOutAlt,
  faMoon, faSun
} from '@fortawesome/free-solid-svg-icons';
import Dashboard1 from './Dashboard1';

const AdminDashboard = ({ userId }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [adminInfo, setAdminInfo] = useState({ username: '', email: '' });
  const [newAdmin, setNewAdmin] = useState({ username: '', email: '', password: '' });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [totalNotificationsCount, setTotalNotificationsCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/api/users/${userId}`);
        if (response.data) {
          setAdminInfo(response.data);
        } else {
          console.error('Données de l\'administrateur non trouvées.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'administrateur:', error);
      }
    };

    fetchAdminInfo();
  }, [userId]);

  useEffect(() => {
    const fetchTotalNotificationsCount = async () => {
      try {
        const projectNotificationsResponse = await axios.get('http://localhost:8083/api/service-requests/count');
        const totalCount = projectNotificationsResponse.data.count;
        setTotalNotificationsCount(totalCount);
      } catch (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
    };

    fetchTotalNotificationsCount();
  }, []);

  const handleProfileClick = () => {
    setShowProfile(prev => !prev);
  };

  const handleAddAdminToggle = () => {
    setShowAddAdmin(prev => !prev);
  };

  const handleUpdateAdmin = async () => {
    try {
      const response = await axios.put('/api/admin/update', adminInfo);
      setAdminInfo(response.data);
      setShowProfile(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de l\'administrateur:', error);
    }
  };

  const handleAddAdmin = async () => {
    try {
      await axios.post('/api/admin/add', newAdmin);
      setNewAdmin({ username: '', email: '', password: '' });
      setShowAddAdmin(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'un administrateur:', error);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleNotificationClick = () => {
    navigate('/admin-dashboard/notifications');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="dashboard-header">
        <div className="dashboard-logo-container">
          <img src={logo} alt="Logo" className="dashboard-logo" />
          <span className="dashboard-user-info">
            Bonjour {adminInfo.username || ''} !
          </span>
        </div>
        <div className="dashboard-actions">
          <FontAwesomeIcon 
            icon={isDarkMode ? faSun : faMoon} 
            className="dashboard-theme-icon" 
            onClick={handleThemeToggle} 
          />
          <div className="dashboard-notification-container">
            <FontAwesomeIcon 
              icon={faBell} 
              className="dashboard-notification-icon" 
              onClick={handleNotificationClick}
            />
            {totalNotificationsCount > 0 && (
              <span className="notification-badge">{totalNotificationsCount}</span>
            )}
          </div>
          <FontAwesomeIcon 
            icon={faUser} 
            className="dashboard-profile-icon" 
            onClick={handleProfileClick} 
          />
        </div>
      </header>
      <aside className="dashboard-sidebar">
        <ul>
          <li>
            <Link to="/admin-dashboard">
              <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
              <span className="sidebar-text">Tableau de bord</span>
            </Link>
          </li>
          <li>
            <Link to="manage-users">
              <FontAwesomeIcon icon={faUserCog} className="sidebar-icon" />
              <span className="sidebar-text">Gérer les utilisateurs</span>
            </Link>
          </li>
          <li>
            <Link to="manage-tools">
              <FontAwesomeIcon icon={faTools} className="sidebar-icon" />
              <span className="sidebar-text">Gérer les outils</span>
            </Link>
          </li>
          <li>
            <Link to="project-overview">
              <FontAwesomeIcon icon={faProjectDiagram} className="sidebar-icon" />
              <span className="sidebar-text">Aperçu des projets</span>
            </Link>
          </li>
          <li>
            <Link to="notifications">
              <FontAwesomeIcon icon={faBell} className="sidebar-icon" />
              <span className="sidebar-text">Notifications</span>
              {totalNotificationsCount > 0 && (
                <span className="sidebar-notification-badge">{totalNotificationsCount}</span>
              )}
            </Link>
          </li>
        </ul>
        <div className="dashboard-logout">
          <button onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
            <span className="sidebar-text">Déconnexion</span>
          </button>
        </div>
      </aside>
      <main className="dashboard-main">
        {location.pathname === '/admin-dashboard' ? <Dashboard1 /> : <Outlet />}
        {showProfile && (
          <div className="profile-modal">
            <div className="profile-info">
              <img src={defaultProfileImage} alt="Profile" className="profile-image" />
              <input
                type="text"
                value={adminInfo.username}
                onChange={(e) => setAdminInfo({ ...adminInfo, username: e.target.value })}
                placeholder="Nom d'utilisateur"
              />
              <input
                type="email"
                value={adminInfo.email}
                onChange={(e) => setAdminInfo({ ...adminInfo, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div className="profile-actions">
              <button onClick={handleUpdateAdmin}>Mettre à jour</button>
              <button onClick={handleAddAdminToggle}>
                {showAddAdmin ? 'Cacher Ajouter Admin' : 'Ajouter Admin'}
              </button>
            </div>
            {showAddAdmin && (
              <div className="profile-add-admin-section">
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
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export { AdminDashboard };
