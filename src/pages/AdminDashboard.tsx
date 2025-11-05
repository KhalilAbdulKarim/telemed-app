import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from '@mui/material';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<{ specialists: number; patients: number; appointments: number } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ specialists: 5, patients: 50, appointments: 12 });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {!stats ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          }}
        >
          <Card>
            <CardContent>
              <Typography>Specialists</Typography>
              <Typography variant="h5">{stats.specialists}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography>Patients</Typography>
              <Typography variant="h5">{stats.patients}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography>Appointments</Typography>
              <Typography variant="h5">{stats.appointments}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default AdminDashboard;
