import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTools, faProjectDiagram, faHeart } from '@fortawesome/free-solid-svg-icons';
import './DashboardHome.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardHome = () => {
  const [userData, setUserData] = useState({
    projects: 0,
    favorites: 0,
    toolsLiked: 0,
    toolDistribution: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = 26;
        const [projectsResponse, favoritesResponse, toolsLikedResponse, toolDistributionResponse] = await Promise.all([
          axios.get(`http://localhost:8083/api/service-requests/count-projects?userId=${userId}`),
          axios.get(`http://localhost:8083/api/user/favorites/count-favorites?userId=${userId}`),
          axios.get(`http://localhost:8083/api/tools/count-tools-liked?userId=${userId}`),
          axios.get(`http://localhost:8083/api/tools/distribution?userId=${userId}`)
        ]);

        console.log('Projects Response:', projectsResponse.data);
        console.log('Favorites Response:', favoritesResponse.data);
        console.log('Tools Liked Response:', toolsLikedResponse.data);
        console.log('Tool Distribution Response:', toolDistributionResponse.data);

        setUserData({
          projects: projectsResponse.data,
          favorites: favoritesResponse.data,
          toolsLiked: toolsLikedResponse.data,
          toolDistribution: toolDistributionResponse.data,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord :', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: ['Favoris', 'Projets', 'Outils Aimés'],
    datasets: [{
      label: 'Nombre',
      data: [userData.favorites, userData.projects, userData.toolsLiked],
      backgroundColor: ['#dc3545', '#28a745', '#007bff'],
    }]
  };

  const pieData = {
    labels: userData.toolDistribution.map(tool => tool.label),
    datasets: [{
      label: 'Outils Favoris',
      data: userData.toolDistribution.map(tool => tool.value),
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff9999', '#66b3ff', '#99ff99'],
    }]
  };

  return (
    <div className="dashboard-home">
      <div className="dashboard-sections">
        <div className="section-box">
          <FontAwesomeIcon icon={faUser} className="section-icon" />
          <span className="section-label">Compte</span>
        </div>
        <div className="section-box">
          <FontAwesomeIcon icon={faHeart} className="section-icon" />
          <span className="section-label">Favoris</span>
          <span className="section-value">{userData.favorites}</span>
        </div>
        <div className="section-box">
          <FontAwesomeIcon icon={faProjectDiagram} className="section-icon" />
          <span className="section-label">Projets</span>
          <span className="section-value">{userData.projects}</span>
        </div>
        <div className="section-box">
          <FontAwesomeIcon icon={faTools} className="section-icon" />
          <span className="section-label">Outils Aimés</span>
          <span className="section-value">{userData.toolsLiked}</span>
        </div>
      </div>
      <div className="dashboard-graphs">
        <div className="graph-box">
          <Bar data={barData} />
        </div>
        <div className="graph-box">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
