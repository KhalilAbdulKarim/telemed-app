import React from "react";

const LoginPage: React.FC = () => {
  // ✅ Your verified, working Cognito login link
  const COGNITO_LOGIN_URL =
    "https://eu-north-1ct1pyvv7u.auth.eu-north-1.amazoncognito.com/login?client_id=6jleg52bmn4lclibreb9vs5tm8&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd84l1y8p4kdic.cloudfront.net";

  const handleLogin = () => {
    window.location.href = COGNITO_LOGIN_URL; // just redirect to hosted UI
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontFamily: "sans-serif", color: "#1976d2" }}>
        Welcome to TeleMed
      </h1>
      <p style={{ maxWidth: 400, color: "#555" }}>
        Secure login for patients, doctors, and administrators.
      </p>

      <button
        onClick={handleLogin}
        style={{
          marginTop: 30,
          padding: "12px 28px",
          backgroundColor: "#1976d2",
          color: "white",
          fontSize: "16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Sign in with Amazon Cognito
      </button>
    </div>
  );
};

export default LoginPage;
