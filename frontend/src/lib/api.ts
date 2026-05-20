const normalizeBaseUrl = (value: string) => value.replace(/\/$/, "");

const resolveBackendBaseUrl = () => {
  const envBackend = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  if (envBackend) {
    return normalizeBaseUrl(envBackend);
  }

  const envApiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envApiUrl) {
    return normalizeBaseUrl(
      envApiUrl.replace(/\/(api\/admin|api\/public)\/?$/, "")
    );
  }

  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    return isLocalhost
      ? "http://localhost/turizm-acente-php/backend"
      : "https://api-asr.altexwebagency.com.tr";
  }

  return "http://localhost/turizm-acente-php/backend";
};

export const BACKEND_BASE_URL = resolveBackendBaseUrl();

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
