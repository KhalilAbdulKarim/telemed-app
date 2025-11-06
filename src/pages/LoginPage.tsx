// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   MenuItem,
//   Snackbar,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const roles = ['Patient', 'Doctor', 'Administrator'] as const;
// type Role = typeof roles[number];

// const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<Role | ''>('');
//   const [snack, setSnack] = useState<string | null>(null);

//   const navigate = useNavigate(); // assumes react-router-dom v6+

// //   const handleLogin = () => {
// //   if (!username || !password || !role) {
// //     setSnack('Please fill all fields');
// //     return;
// //   }

// //   localStorage.setItem('role', role); // save role for route guard
// //   setSnack(`Logged in as ${role}`);

// //   setTimeout(() => {
// //     switch (role) {
// //       case 'Patient':
// //         navigate('/patient-records');
// //         break;
// //       case 'Doctor':
// //         navigate('/doctor-dashboard');
// //         break;
// //       case 'Administrator':
// //         navigate('/admin-dashboard');
// //         break;
// //     }
// //   }, 500);
// // };

// const handleLogin = () => {
//   if (!username || !password || !role) {
//     setSnack('Please fill all fields');
//     return;
//   }

//   localStorage.setItem('role', role); // store role
//   localStorage.setItem('username', username); // store username for later
//   setSnack(`Logged in as ${role}`);

//   setTimeout(() => {
//     switch (role) {
//       case 'Patient':
//         navigate('/patient-profile');
//         break;
//       case 'Doctor':
//         navigate('/doctor-dashboard');
//         break;
//       case 'Administrator':
//         navigate('/admin-dashboard');
//         break;
//     }
//   }, 500);
// };

//   return (
//     <Container maxWidth="xs" sx={{ mt: 10 }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <Typography variant="h4" textAlign="center">
//           TeleMed Login
//         </Typography>

//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//         />
//         <TextField
//           select
//           label="Role"
//           value={role}
//           onChange={(e) => setRole(e.target.value as Role)}
//           fullWidth
//         >
//           {roles.map((r) => (
//             <MenuItem key={r} value={r}>
//               {r}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Button variant="contained" fullWidth onClick={handleLogin}>
//           Login
//         </Button>
//       </Box>

//       <Snackbar
//         open={!!snack}
//         autoHideDuration={3000}
//         onClose={() => setSnack(null)}
//         message={snack}
//       />
//     </Container>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Role = 'Patient' | 'Doctor' | 'Administrator';

interface MockUser {
  username: string;
  password: string;
  role: Role;
}

const mockUsers: MockUser[] = [
  { username: 'patient1', password: '1234', role: 'Patient' },
  { username: 'doctor1', password: 'abcd', role: 'Doctor' },
  { username: 'admin1', password: 'admin', role: 'Administrator' },
];

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snack, setSnack] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setSnack('Please fill all fields');
      return;
    }

    setLoading(true);

    // 🔹 Simulate network delay
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        setSnack('Invalid username or password');
        setLoading(false);
        return;
      }

      // Save demo session
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.username);
      localStorage.setItem('role', user.role);

      setSnack(`Welcome ${user.username} (${user.role})`);

      // Redirect based on role
      setTimeout(() => {
        switch (user.role) {
          case 'Patient':
            navigate('/patient-profile');
            break;
          case 'Doctor':
            navigate('/doctor-dashboard');
            break;
          case 'Administrator':
            navigate('/admin-dashboard');
            break;
        }
      }, 800);

      setLoading(false);
    }, 1000);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" textAlign="center">
          TeleMed Login
        </Typography>

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          <strong>Demo Accounts:</strong><br />
          Patient → patient1 / 1234<br />
          Doctor → doctor1 / abcd<br />
          Admin → admin1 / admin
        </Typography>
      </Box>

      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        onClose={() => setSnack(null)}
        message={snack}
      />
    </Container>
  );
};

export default LoginPage;
