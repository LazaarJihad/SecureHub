import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import axios from 'axios';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Dashboard1 = () => {
  const [data, setData] = useState({
    projects: 0,
    tools: 0,
    users: [],
    statusCounts: {},
    favoritesCount: {},
    toolsList: [],
    toolsFavorites: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, toolsResponse, usersResponse, statusResponse, favoritesResponse] = await Promise.all([
          axios.get('http://localhost:8083/api/service-requests'),
          axios.get('http://localhost:8083/api/tools'),
          axios.get('http://localhost:8083/api/users'),
          axios.get('http://localhost:8083/api/service-requests/count-projects-by-status'),
          axios.get('http://localhost:8083/api/tools/favorites-count'),
        ]);

        const toolsList = toolsResponse.data;
        const toolsFavorites = toolsList.reduce((acc, tool) => {
          acc[tool.id] = favoritesResponse.data[tool.id] || 0;
          return acc;
        }, {});

        setData({
          projects: projectsResponse.data.length,
          tools: toolsResponse.data.length,
          users: usersResponse.data.filter((user) => user.role === 'ROLE_USER'),
          statusCounts: statusResponse.data,
          favoritesCount: favoritesResponse.data,
          toolsList,
          toolsFavorites,
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const statusLabels = ['Terminé', 'En cours', 'Non commencé'];
  const statusData = statusLabels.map((status) => data.statusCounts[status] || 0);

  const statusChartData = {
    labels: statusLabels,
    datasets: [
      {
        label: 'Nombre de Projets par Statut',
        data: statusData,
        backgroundColor: '#007bff', // Bleu foncé
        borderColor: '#0056b3',
        borderWidth: 1,
        hoverOffset: 4,
      },
      {
        label: 'Nombre Cumulé de Projets',
        data: statusData.map((_, index) => statusData.slice(0, index + 1).reduce((a, b) => a + b, 0)),
        type: 'line',
        borderColor: '#ff6600', // Orange
        backgroundColor: 'rgba(255, 102, 0, 0.2)',
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  const toolsFavoritesData = {
    labels: data.toolsList.map((tool) => tool.name),
    datasets: [
      {
        label: 'Nombre de Favoris',
        data: data.toolsList.map((tool) => data.toolsFavorites[tool.id] || 0),
        backgroundColor: data.toolsList.map((_, index) => `rgba(0, 123, 255, 0.${index + 3})`), // Bleu foncé avec opacité variable
        borderColor: data.toolsList.map(() => `rgba(0, 123, 255, 1)`),
        borderWidth: 1,
      },
    ],
  };

  const usersLineChartData = {
    labels: data.users.map((user) => user.username),
    datasets: [
      {
        label: 'Nombre d\'Utilisateurs',
        data: data.users.map((_, i) => i + 1),
        borderColor: '#00c2ff', // Bleu clair
        backgroundColor: 'rgba(0, 194, 255, 0.2)',
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            if (label) {
              return `${label}: ${context.raw}`;
            }
            return context.raw;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom>Tableau de Bord</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ ...styles.statBox, backgroundColor: '#007bff' }}>
            <Typography variant="h6">Projets</Typography>
            <Typography variant="h4">{data.projects}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ ...styles.statBox, backgroundColor: '#007bff' }}>
            <Typography variant="h6">Outils</Typography>
            <Typography variant="h4">{data.tools}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ ...styles.statBox, backgroundColor: '#007bff' }}>
            <Typography variant="h6">Utilisateurs</Typography>
            <Typography variant="h4">{data.users.length}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={8}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Paper sx={styles.chartBox}>
                <Bar data={statusChartData} options={options} />
              </Paper>
            </Grid>
            <Grid item>
              <Paper sx={styles.chartBox}>
                <Line data={usersLineChartData} options={options} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={styles.chartBox}>
            <Pie data={toolsFavoritesData} options={options} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  statBox: {
    padding: '20px',
    textAlign: 'center',
    color: '#fff',
  },
  chartBox: {
    padding: '20px',
    textAlign: 'center',
  },
};

export default Dashboard1;
