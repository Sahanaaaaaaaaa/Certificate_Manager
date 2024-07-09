import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const cardStyle = {
    padding: '20px',
    textAlign: 'center',
    borderRadius: '15px',
    height: '150px', // Adjusted height
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Added shadow
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer', // Add cursor pointer for clickable feel
  };

  const handleNavigate = (path) => {
    navigate(path); // Function to navigate to the specified path
  };

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h2" fontWeight="bold" mb={4} color="#000">
        Welcome to VeryCert
      </Typography>
      <Typography variant="h5" mb={4} color="#000">
        What would you like to do today?
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={cardStyle}
            onClick={() => handleNavigate('/Pending Requests')}
          >
            <Typography variant="h6" fontWeight="bold">
              Authorize pending requests
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={cardStyle}
            onClick={() => handleNavigate('/Info')}
          >
            <Typography variant="h6" fontWeight="bold">
              Know more about certificates
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={cardStyle}
            onClick={() => handleNavigate('/revoke')}
          >
            <Typography variant="h6" fontWeight="bold">
              Revoke certificates
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={cardStyle}
            onClick={() => handleNavigate('/stats')}
          >
            <Typography variant="h6" fontWeight="bold">
              See recent statistics
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
