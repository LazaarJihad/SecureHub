// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faTools, faProjectDiagram, faFileAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UsersIcon from '@mui/icons-material/Group';
import ToolsIcon from '@mui/icons-material/Build';
import ProjectsIcon from '@mui/icons-material/Assessment';
import ReportsIcon from '@mui/icons-material/Description';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/ExitToApp';

const Sidebar = ({ projectCount }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-link">
        <DashboardIcon className="icon" />
        <span>Tableau de bord</span>
      </div>
      <div className="sidebar-link">
        <UsersIcon className="icon" />
        <span>Gérer les utilisateurs</span>
      </div>
      <div className="sidebar-link">
        <ToolsIcon className="icon" />
        <span>Gérer les outils</span>
      </div>
      <div className="sidebar-link">
        <ProjectsIcon className="icon" />
        <span>Aperçu des projets</span>
      </div>
      <div className="sidebar-link">
        <ReportsIcon className="icon" />
        <span>Rapports</span>
      </div>
      <div className="sidebar-link notification-container">
        <NotificationsIcon className="icon notification-icon" />
        {projectCount > 0 && (
          <span className="notification-badge">{projectCount}</span>
        )}
        <span>Notifications</span>
      </div>
      <div className="sidebar-link logout">
        <LogoutIcon className="icon" />
        <span>Déconnexion</span>
      </div>
    </div>
  );
};

export default Sidebar;
