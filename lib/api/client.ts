import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Update as needed
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if available
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401/403 errors globally
apiClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // Optionally redirect to login or show a message
      console.error('Unauthorized: Please log in.');
    }
    if (err.response?.status === 403) {
      // Optionally show a permission denied message
      console.error('Forbidden: You do not have access to this resource.');
    }
    return Promise.reject(err);
  }
);

if (typeof window !== "undefined") {
  localStorage.setItem('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWFlZDFkejYwMDAwaDAyb3NiOGV5cXdrIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ3MDMyODMzLCJleHAiOjE3NDcwMzM3MzN9.y81V-_mSWeVj3eR4evAhXzqD2zAUL-tdn5n5VDI27Ig');
}

export default apiClient;
