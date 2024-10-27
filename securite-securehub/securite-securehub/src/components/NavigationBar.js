// src/components/NavigationBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavigationBar = ({ toggleDrawer }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          SecureHub
        </Typography>
        <Avatar src="/path/to/user/avatar.jpg" alt="User Avatar" />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
