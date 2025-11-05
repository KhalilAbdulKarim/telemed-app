import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

type Appointment = {
  id: string;
  patientName: string;
  date: string;
  status: 'Pending' | 'Accepted' | 'Declined';
};

const DoctorDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppointments([
        { id: 'a1', patientName: 'John Doe', date: '2025-11-10', status: 'Pending' },
        { id: 'a2', patientName: 'Jane Smith', date: '2025-11-11', status: 'Accepted' },
      ]);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Dashboard
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          }}
        >
          {appointments.map((a) => (
            <Card key={a.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{a.patientName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {a.date}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Status: {a.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  disabled={a.status === 'Accepted'}
                  onClick={() => handleStatusChange(a.id, 'Accepted')}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  disabled={a.status === 'Declined'}
                  onClick={() => handleStatusChange(a.id, 'Declined')}
                >
                  Decline
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default DoctorDashboard;
