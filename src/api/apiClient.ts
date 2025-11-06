const API_BASE_URL = "https://29xrlfp46f.execute-api.eu-north-1.amazonaws.com/prod";

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error(await res.text());
  }

  return res.json();
};
