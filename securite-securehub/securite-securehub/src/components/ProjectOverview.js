import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Container, IconButton, Box, Divider } from '@mui/material';
import axios from 'axios';
import InfoIcon from '@mui/icons-material/Info';
import ProjectDetails from './ProjectDetails';

const ProjectOverview = () => {
  const [projectCounts, setProjectCounts] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8083/api/service-requests/count-projects-by-user')
      .then(response => {
        setProjectCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching project counts:', error);
      });
  }, []);

  const handleCardClick = (companyName) => {
    setSelectedCompany(companyName);
  };

  const getInitials = (companyName) => {
    if (!companyName) return ''; // Handle null or undefined companyName
    const words = companyName.split(' ');
    if (words.length > 1) {
      return words[0].charAt(0) + words[1].charAt(0);
    }
    return companyName.charAt(0);
  };

  const ColoredCircle = ({ initials }) => {
    const circleStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at bottom right, blue 0%, darkblue 70%)',
      color: '#FFFFFF',
      fontSize: '24px',
      marginRight: '15px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    };

    return (
      <div style={circleStyle}>
        {initials}
      </div>
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', color: '#003366' }}>
        Aperçu des projets
      </Typography>
      <Grid container spacing={3}>
        {projectCounts.map(([companyName, count], index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              variant="outlined" 
              onClick={() => handleCardClick(companyName)}
              style={{ 
                height: '160px',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'flex-start',
                padding: '15px',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#FFFFFF',
                borderColor: '#003366',
                cursor: 'pointer'
              }}
            >
              <CardContent style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                <ColoredCircle initials={getInitials(companyName)} />
                <Box style={{ flex: 1 }}>
                  <Typography variant="h6" component="div" style={{ marginBottom: '5px', color: '#003366' }}>
                    {companyName}
                  </Typography>
                  <Typography variant="body1" style={{ color: '#003366' }}>
                    Nombre de projets : {count}
                  </Typography>
                </Box>
                <IconButton 
                  style={{ 
                    position: 'absolute', 
                    bottom: '10px', 
                    right: '10px',
                    color: '#003366'
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider style={{ margin: '20px 0' }} />
      {selectedCompany && (
        <ProjectDetails companyName={selectedCompany} />
      )}
    </Container>
  );
};

export default ProjectOverview;
