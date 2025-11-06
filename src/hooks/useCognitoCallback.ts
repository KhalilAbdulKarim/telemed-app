// // import { useEffect } from "react";
// // import { jwtDecode } from "jwt-decode";

// // interface DecodedToken {
// //   email?: string;
// //   "custom:user_role"?: string;
// // }

// // export const useCognitoCallback = () => {
// //   useEffect(() => {
// //     const params = new URLSearchParams(window.location.search);
// //     const code = params.get("code");
// //     if (!code) return;

// //     const clientId = "6jleg52bmn4lclibreb9vs5tm8";
// //     const redirectUri =
// //       window.location.hostname === "localhost"
// //         ? "http://localhost:3000/"
// //         : "https://d84l1y8p4kdic.cloudfront.net/";

// //     const tokenUrl =
// //       "https://eu-north-1ct1pyvv7u.auth.eu-north-1.amazoncognito.com/oauth2/token";

// //     fetch(tokenUrl, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
// //       body: new URLSearchParams({
// //         grant_type: "authorization_code",
// //         client_id: clientId,
// //         code,
// //         redirect_uri: redirectUri,
// //       }),
// //     })
// //       .then((res) => res.json())
// //       .then((data) => {
// //         console.log("Cognito token response:", data);

// //         if (!data.id_token) {
// //           console.error(" No id_token found in response:", data);
// //           return;
// //         }

// //         const decoded = jwtDecode<DecodedToken>(data.id_token);
// //         const role = decoded["custom:user_role"] || "Patient";
// //         const email = decoded.email || "";

// //         localStorage.setItem("id_token", data.id_token);
// //         localStorage.setItem("access_token", data.access_token);
// //         localStorage.setItem("refresh_token", data.refresh_token);
// //         localStorage.setItem("role", role);
// //         localStorage.setItem("email", email);

// //         console.log(`✅ Logged in as ${email} (${role})`);

// //         // Redirect user based on role
// //         switch (role) {
// //           case "Patient":
// //             window.location.href = "/patient-profile";
// //             break;
// //           case "Doctor":
// //             window.location.href = "/doctor-dashboard";
// //             break;
// //           case "Administrator":
// //             window.location.href = "/admin-dashboard";
// //             break;
// //           default:
// //             window.location.href = "/";
// //         }
// //       })
// //       .catch((err) => console.error("Error exchanging token:", err));
// //   }, []);
// // };

// import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// interface DecodedToken {
//   email?: string;
//   "custom:user_role"?: string;
// }

// export const useCognitoCallback = () => {
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");
//     if (!code) return; // No Cognito redirect code

//     const clientId = "6jleg52bmn4lclibreb9vs5tm8";
//     const redirectUri =
//       window.location.hostname.includes("localhost")
//         ? "http://localhost:3000"
//         : "https://d84l1y8p4kdic.cloudfront.net";

//     fetch("https://eu-north-1ct1pyvv7u.auth.eu-north-1.amazoncognito.com/oauth2/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         grant_type: "authorization_code",
//         client_id: clientId,
//         code,
//         redirect_uri: redirectUri,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.id_token) {
//           const decoded = jwtDecode<DecodedToken>(data.id_token);
//           const role = decoded["custom:user_role"];
//           const email = decoded.email;

//           localStorage.setItem("id_token", data.id_token);
//           localStorage.setItem("access_token", data.access_token);
//           localStorage.setItem("refresh_token", data.refresh_token);
//           localStorage.setItem("role", role || "");
//           localStorage.setItem("email", email || "");

//           // Redirect after successful token exchange
//           if (role === "Doctor") window.location.href = "/doctor-dashboard";
//           else if (role === "Administrator") window.location.href = "/admin-dashboard";
//           else window.location.href = "/patient-profile";
//         } else {
//           console.error("No id_token found:", data);
//         }
//       })
//       .catch((err) => console.error("Token exchange failed:", err));
//   }, []);
// };

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
    if (!code) return; // no Cognito redirect code, stop here

    const clientId = "6jleg52bmn4lclibreb9vs5tm8";
    const redirectUri =
      window.location.hostname.includes("localhost")
        ? "http://localhost:3000/"
        : "https://d11rr8edee9tbbb.cloudfront.net/"; // ✅ your new CloudFront domain

    const tokenUrl =
      "https://eu-north-1ct1pyvv7u.auth.eu-north-1.amazoncognito.com/oauth2/token";

    // Exchange authorization code for tokens
    fetch(tokenUrl, {
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
        console.log("🔑 Cognito token response:", data);

        if (!data.id_token) {
          console.error("❌ No id_token found in response:", data);
          return;
        }

        const decoded = jwtDecode<DecodedToken>(data.id_token);
        const role = decoded["custom:user_role"] || "Patient";
        const email = decoded.email || "";

        // Store tokens locally
        localStorage.setItem("id_token", data.id_token);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);

        console.log(`✅ Logged in as ${email} (${role})`);

        // Redirect based on role
        switch (role) {
          case "Doctor":
            window.location.href = "/doctor-dashboard";
            break;
          case "Administrator":
            window.location.href = "/admin-dashboard";
            break;
          default:
            window.location.href = "/patient-profile";
        }
      })
      .catch((err) => console.error("⚠️ Error exchanging token:", err));
  }, []);
};

