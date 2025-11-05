import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" gutterBottom>
        TeleMedicine Connect
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Connect securely with your doctor anywhere, anytime.
      </Typography>
      <Button variant="contained" sx={{ m: 1 }} onClick={() => navigate('/search')}>
        Find a Specialist
      </Button>
      <Button variant="outlined" sx={{ m: 1 }} onClick={() => navigate('/records')}>
        My Records
      </Button>
    </Container>
  );
};

export default LandingPage;
