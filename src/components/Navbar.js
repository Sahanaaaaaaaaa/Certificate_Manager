import React from 'react';
import { IconButton, Button } from '@mui/material';
import { Menu as MenuIcon, ArrowBack as ArrowBackIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'; // Import ArrowBackIcon and ExitToAppIcon
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Navbar = ({ toggleSidebar, handleLogout }) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/Home'); // Navigate to the 'Home' page
  };

  const handleLogoutClick = () => {
    handleLogout(); // Call handleLogout function passed from App.js
  };

  return (
    <nav style={{ 
      height: '60px', 
      backgroundColor: '#701f70', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', // Align items with space between
      padding: '0 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1100,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <div style={{ textAlign: 'left', marginLeft: '10px' }}> {/* Adjust margin as needed */}
          <h1 style={{ margin: 0 }}>VeryCert</h1> {/* Centered h1 */}
          <p style={{ fontSize: '14px', margin: 0 }}>Certify with Confidence, Manage with Ease.</p> {/* Slogan */}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton edge="end" color="inherit" aria-label="back to home" onClick={handleNavigateHome}>
          <ArrowBackIcon /> Home
        </IconButton>
        <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />} onClick={handleLogoutClick} style={{ marginLeft: '10px' }}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
