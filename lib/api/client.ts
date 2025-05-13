import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://budget-buddy-backend-u8ni.onrender.com', // Ensure the base URL is set
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if available
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // Log for debugging
    console.log('API Request with token:', { url: config.url, method: config.method });
  } else {
    console.warn('No auth token found in localStorage');
  }
  return config;
});

// Handle 401/403 errors globally
apiClient.interceptors.response.use(
  res => res,
  err => {
    // Log the error for debugging
    console.error('API Error:', {
      status: err.response?.status,
      url: err.config?.url,
      method: err.config?.method,
      data: err.response?.data,
    });
    
    if (err.response?.status === 401) {
      console.error('Unauthorized: Please log in.');
      // Could redirect to login page here
    }
    if (err.response?.status === 403) {
      console.error('Forbidden: You do not have access to this resource.');
    }
    return Promise.reject(err);
  }
);

// Set a token for development/testing
// In production, this would come from your auth system
if (typeof window !== "undefined") {
  // Using a placeholder token - in real app, this would come from your authentication flow
  localStorage.setItem('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWFlZDFkejYwMDAwaDAyb3NiOGV5cXdrIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ3MTIxOTk5LCJleHAiOjE3NDcxMjI4OTl9.YpE0K133Pqj1hJZYUocIlNQUNZg-bkBM7gp-F2C3tEs');
}

export default apiClient;
