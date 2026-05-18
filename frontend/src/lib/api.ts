export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/backend/api/admin";
export const PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_PUBLIC_API_URL || API_BASE_URL.replace("/admin", "/public");
export const BACKEND_BASE_URL = API_BASE_URL.replace("/api/admin", "");

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    ...(!options.body || !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
