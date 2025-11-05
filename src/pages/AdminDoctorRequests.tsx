import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Box } from '@mui/material';

type User = {
  id: string;
  username: string;
  role: 'Patient' | 'Doctor' | 'Administrator';
  doctorRequest?: boolean;
};

interface Props {
  users: User[];
  onUpdateUserRole: (id: string, newRole: 'Patient' | 'Doctor') => void;
}

const AdminDoctorRequests: React.FC<Props> = ({ users, onUpdateUserRole }) => {
  const requests = users.filter((u) => u.doctorRequest);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Role Requests
      </Typography>

      {requests.length === 0 ? (
        <Typography>No pending requests.</Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          }}
        >
          {requests.map((u) => (
            <Card key={u.id}>
              <CardContent>
                <Typography variant="h6">{u.username}</Typography>
                <Typography>Current Role: {u.role}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => onUpdateUserRole(u.id, 'Doctor')}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => onUpdateUserRole(u.id, 'Patient')}
                >
                  Reject
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default AdminDoctorRequests;
