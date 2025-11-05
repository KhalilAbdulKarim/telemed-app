import React, { useState } from 'react';
import { Box, Typography, Button, Snackbar } from '@mui/material';

type User = {
  id: string;
  username: string;
  role: 'Patient' | 'Doctor' | 'Administrator';
  doctorRequest?: boolean;
};

interface Props {
  user: User;
  onRequestDoctor: (id: string) => void; // this will come from App.tsx
}

const PatientProfile: React.FC<Props> = ({ user, onRequestDoctor }) => {
  const [snack, setSnack] = useState<string | null>(null);

  const handleRequest = () => {
    onRequestDoctor(user.id); // update App.tsx state
    setSnack('Doctor role request sent');
  };

  return (
    <Box>
      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="body1">Role: {user.role}</Typography>

      {user.role === 'Patient' && !user.doctorRequest && (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleRequest}>
            Request to be Doctor
          </Button>
        </Box>
      )}

      {user.role === 'Patient' && user.doctorRequest && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Your request to become a doctor is pending.
          </Typography>
        </Box>
      )}

      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        onClose={() => setSnack(null)}
        message={snack}
      />
    </Box>
  );
};

export default PatientProfile;
