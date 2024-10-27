// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
const Dashboard = () => {
  const [tools, setTools] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/outils')
      .then(response => setTools(response.data))
      .catch(error => console.error('Erreur lors du chargement des outils:', error));
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <NavigationBar toggleDrawer={toggleDrawer} />
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Container>
        <Typography variant="h4" gutterBottom>Outils de Sécurité</Typography>
        <List>
          {tools.map(tool => (
            <ListItem key={tool.id}>
              <ListItemText
                primary={tool.nomOutil}
                secondary={tool.description}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default Dashboard;
