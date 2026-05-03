import axios from "axios";

// Global loading counter to handle parallel requests
let activeRequests = 0;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
    },
});

// 🔥 Request Interceptor: Show loading bar when API call starts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Start loading bar on first request
  if (activeRequests === 0) {
    // Dispatch custom event to trigger loading bar globally
    window.dispatchEvent(new CustomEvent('startPageLoading'));
  }
  activeRequests++;

  return config;
});

// 🔥 Response Interceptor: Hide loading bar when API call completes
api.interceptors.response.use(
  (response) => {
    activeRequests--;
    // Stop loading bar when all requests complete
    if (activeRequests === 0) {
      window.dispatchEvent(new CustomEvent('stopPageLoading'));
    }
    return response;
  },
  (error) => {
    activeRequests--;
    // Always stop loading bar even on error
    if (activeRequests === 0) {
      window.dispatchEvent(new CustomEvent('stopPageLoading'));
    }

    if (error.response?.status === 401) {
      
      // 🔥 Token expired or invalid
      localStorage.removeItem("token");

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
