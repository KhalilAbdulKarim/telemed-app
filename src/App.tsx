import React, { JSX, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PatientRecords from "./pages/PatientRecords";
import SpecialistSearch from "./pages/SpecialistSearch";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDoctorRequests from "./pages/AdminDoctorRequests";
import PatientDashboard from "./pages/PatientDashboard";
import { useCognitoCallback } from "./hooks/useCognitoCallback";


export type User = {
  id: string;
  username: string;
  role: "Patient" | "Doctor" | "Administrator";
  doctorRequest?: boolean;
};

const initialUsers: User[] = [
  { id: "1", username: "Alice", role: "Patient" },
  { id: "2", username: "Bob", role: "Patient" },
  { id: "3", username: "Admin", role: "Administrator" },
];

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
  useCognitoCallback();
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleUpdateUserRole = (id: string, newRole: "Patient" | "Doctor") => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, role: newRole, doctorRequest: newRole === "Patient" ? false : undefined }
          : u
      )
    );
  };

  const currentUserId = localStorage.getItem("userId");
  // const currentUser = users.find((u) => u.id === currentUserId);

  return (
    <>
      
     

      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/patient-profile"
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
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Administrator"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-doctor-requests"
          element={
            <ProtectedRoute allowedRoles={["Administrator"]}>
              <AdminDoctorRequests users={users} onUpdateUserRole={handleUpdateUserRole} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
