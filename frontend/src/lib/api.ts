const getBackendBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost/turizm-acente-php/backend';
    }
    return `${origin}/backend`;
  }
  return 'http://localhost/turizm-acente-php/backend';
};

export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? process.env.NEXT_PUBLIC_API_URL.replace("/api/admin", "") 
  : getBackendBaseUrl();

export const API_BASE_URL = `${BACKEND_BASE_URL}/api/admin`;
export const PUBLIC_API_BASE_URL = `${BACKEND_BASE_URL}/api/public`;

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
