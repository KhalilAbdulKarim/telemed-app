import React, { JSX } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useCognitoAuth } from "./hooks/useCognitoAuth";
import LoginPage from "./pages/LoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import PatientRecords from "./pages/PatientRecords";
import SpecialistSearch from "./pages/SpecialistSearch";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";


const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) => {
  const role = localStorage.getItem("role");
  if (!role || !allowedRoles.includes(role)) return <Navigate to="/" replace />;
  return children;
};

const App: React.FC = () => {
  useCognitoAuth(); // handle token & redirect

  return (
    <Router>
      <Routes>
        {/* Login / Root */}
        <Route path="/" element={<LoginPage />} />

        {/* Patient Routes */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-records"
          element={
            <ProtectedRoute allowedRoles={["Patient"]}>
              <PatientRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/specialist-search"
          element={
            <ProtectedRoute allowedRoles={["Patient"]}>
              <SpecialistSearch />
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Administrator"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/admin-doctor-requests"
          element={
            <ProtectedRoute allowedRoles={["Administrator"]}>
              <AdminDoctorRequests />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
