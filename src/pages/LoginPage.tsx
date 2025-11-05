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
  MenuItem,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const roles = ['Patient', 'Doctor', 'Administrator'] as const;
type Role = typeof roles[number];

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [snack, setSnack] = useState<string | null>(null);

  const navigate = useNavigate(); // react-router-dom v6

  const handleLogin = () => {
    if (!username || !password || !role) {
      setSnack('Please fill all fields');
      return;
    }

    // Save user info in localStorage (simulate login)
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', username); // for simplicity, use username as id

    setSnack(`Logged in as ${role}`);

    // Redirect based on role
    setTimeout(() => {
      switch (role) {
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
    }, 500);
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
        <TextField
          select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          fullWidth
        >
          {roles.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" fullWidth onClick={handleLogin}>
          Login
        </Button>
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
