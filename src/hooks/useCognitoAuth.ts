import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  email?: string;
  "custom:user_role"?: string;
  sub?: string;
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
        const id = decoded.sub;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role || "");
        localStorage.setItem("email", email || "");
        localStorage.setItem("userId", id || "");

        switch (role) {
          case "Patient":
            navigate("/patient-dashboard");
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

export default useCognitoAuth;