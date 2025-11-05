import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Container } from '@mui/material';
import PatientProfile from './PatientProfile';
import PatientRecords from './PatientRecords';
import SpecialistSearch from './SpecialistSearch';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
};

const PatientDashboard: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Get current user from localStorage
  const username = localStorage.getItem('username') || 'Patient';
  const userId = localStorage.getItem('userId') || '1';
  const role = localStorage.getItem('role') as 'Patient' | null;

  const user = { id: userId, username, role: role || 'Patient' };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {username}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Profile" />
          <Tab label="Records" />
          <Tab label="Specialists" />
        </Tabs>
      </Box>

      <TabPanel value={tabIndex} index={0}>
        <PatientProfile
            user={user}
            onRequestDoctor={(id: string) => {
            // call App.tsx function that updates state
            console.log('Request Doctor for', id);
            // <PatientProfile user={user} onRequestDoctor={handleRequestDoctor} />

            }}
        />
        </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <PatientRecords />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <SpecialistSearch />
      </TabPanel>
    </Container>
  );
};

export default PatientDashboard;
