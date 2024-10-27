import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ManageUsers from './components/ManageUsers';
import ManageTools from './components/ManageTools';
import ProjectOverview from './components/ProjectOverview';
import Reports from './components/Reports';
import Notifications from './components/Notifications'; // Correctly import Notifications component


import DashboardHome from './components/DashboardHome';
import ToolsPage from './components/ToolsPage';
import ProjectsPage from './components/ProjectsPage';
import ReportsPage from './components/ReportsPage';
import FavoritesPage from './components/FavoritesPage';
import Dashboard1 from './components/Dashboard1';
import ProjectDetails from './components/ProjectDetails';
import DemandesDeService from './components/DemandesDeService';
import Devis from './components/Devis';

import Projets from './components/Projets';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard username={'username'} />}>
          <Route index element={<Dashboard1 />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-tools" element={<ManageTools />} />
          <Route path="project-overview" element={<ProjectOverview />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications entrepriseId={1} serviceRequestId={1} />} />

          <Route path="projects/:companyName" element={<ProjectDetails />} />
        </Route>
        <Route path="/user-dashboard" element={<UserDashboard username={'username'} />}>
          <Route index element={<DashboardHome />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="demandes-de-service" element={<DemandesDeService />} />
          <Route path="devis" element={<Devis />} />
          
          <Route path="projets" element={<Projets />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
