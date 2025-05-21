import axios from "axios";

// Create a base API instance with default configurations
const apiClient = axios.create({
  baseURL:"http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for adding authorization header or other transformations
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling or response transformation
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle generic errors (like network errors, timeouts)
    if (!error.response) {
      console.error("Network error or timeout:", error.message);
    }

    // You can handle specific status codes here
    // if (error.response?.status === 401) {
    //   // Handle unauthorized access
    // }

    return Promise.reject(error);
  }
);

export default apiClient;
