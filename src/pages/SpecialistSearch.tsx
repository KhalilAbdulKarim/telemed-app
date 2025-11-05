import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Snackbar,
  CircularProgress,
  Box,
} from '@mui/material';

type Specialist = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  available: boolean;
};

const SpecialistSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const data: Specialist[] = [
        { id: '1', name: 'Dr. Amina Dupont', specialty: 'Cardiology', rating: 4.8, available: true },
        { id: '2', name: 'Dr. Lucas Martin', specialty: 'Dermatology', rating: 4.5, available: false },
      ];
      setSpecialists(
        data.filter((s) =>
          (s.name + ' ' + s.specialty).toLowerCase().includes(query.toLowerCase())
        )
      );
      setLoading(false);
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  const handleCall = (id: string) =>
    setSnack(`Start video call with specialist #${id} (AWS placeholder)`);
  const handleAppointment = (id: string) => setSnack(`Appointment requested for #${id}`);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Find a Specialist
      </Typography>

      <TextField
        fullWidth
        label="Search by name or specialty"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        /* responsive CSS grid: 1 column on xs, 2 columns on md+ */
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            alignItems: 'stretch',
          }}
        >
          {specialists.map((s) => (
            <Card key={s.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{s.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {s.specialty}
                </Typography>
                <Typography sx={{ mt: 1, color: s.available ? 'success.main' : 'error.main' }}>
                  {s.available ? 'Available' : 'Not Available'}
                </Typography>
              </CardContent>

              <CardActions>
                <Button variant="contained" onClick={() => handleCall(s.id)}>
                  Video Call
                </Button>
                <Button variant="outlined" onClick={() => handleAppointment(s.id)}>
                  Appointment
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        onClose={() => setSnack(null)}
        message={snack}
      />
    </Container>
  );
};

export default SpecialistSearch;
