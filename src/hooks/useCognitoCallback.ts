import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email?: string;
  "custom:user_role"?: string;
}

export const useCognitoCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    const clientId = "6jleg52bmn4lclibreb9vs5tm8";
    const redirectUri =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://d84l1y8p4kdic.cloudfront.net";
        

    // Exchange authorization code for tokens
    fetch("https://eu-north-1ct1pyvv7u.auth.eu-north-1.amazoncognito.com/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        code,
        redirect_uri: redirectUri,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Cognito token response:", data);
        if (data.id_token) {
          const decoded = jwtDecode<DecodedToken>(data.id_token);
          const role = decoded["custom:user_role"];
          const email = decoded.email;

          localStorage.setItem("id_token", data.id_token);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          localStorage.setItem("role", role || "");
          localStorage.setItem("email", email || "");

          // Redirect user based on role
          switch (role) {
            case "Patient":
              window.location.href = "/patient-profile";
              break;
            case "Doctor":
              window.location.href = "/doctor-dashboard";
              break;
            case "Administrator":
              window.location.href = "/admin-dashboard";
              break;
            default:
              window.location.href = "/";
          }
        } else {
          console.error("No id_token found in response:", data);
        }
      })
      .catch((err) => console.error("Error exchanging token:", err));
  }, []);
};
