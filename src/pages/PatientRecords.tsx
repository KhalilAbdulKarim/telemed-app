import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from '@mui/material';

type RecordItem = {
  id: string;
  date: string;
  title: string;
  notes: string;
};

const PatientRecords: React.FC = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecords([
        { id: 'r1', date: '2025-01-01', title: 'Blood Test', notes: 'Normal results.' },
        { id: 'r2', date: '2025-03-02', title: 'MRI', notes: 'No anomalies detected.' },
      ]);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Records
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
          {records.map((rec) => (
            <Card key={rec.id}>
              <CardContent>
                <Typography variant="h6">{rec.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {rec.date}
                </Typography>
                <Typography variant="body2">{rec.notes}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default PatientRecords;
