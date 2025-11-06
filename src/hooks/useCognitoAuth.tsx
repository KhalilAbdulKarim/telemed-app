import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  email?: string;
  "custom:user_role"?: string;
}

export const useCognitoAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("id_token")) {
      const token = new URLSearchParams(hash.replace("#", "?")).get("id_token");
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        const role = decoded["custom:user_role"];
        const email = decoded.email;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role || "");
        localStorage.setItem("email", email || "");

        switch (role) {
          case "Patient":
            navigate("/patient-profile");
            break;
          case "Doctor":
            navigate("/doctor-dashboard");
            break;
          case "Administrator":
            navigate("/admin-dashboard");
            break;
          default:
            navigate("/");
        }
      }
    }
  }, [navigate]);
};
