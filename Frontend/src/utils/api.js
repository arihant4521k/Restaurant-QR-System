// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add auth token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = await axios.post(
//           `${import.meta.env.VITE_API_URL}/auth/refresh`,
//           { refreshToken }
//         );

//         const { token } = response.data.data;
//         localStorage.setItem('token', token);

//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests (ONLY if token exists)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Don't add Authorization header if no token - allows guest orders
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh and errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only try to refresh token if we actually have a token
    const hasToken = localStorage.getItem('token');
    
    if (error.response?.status === 401 && hasToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token, just reject
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
          { refreshToken }
        );

        if (response.data.success) {
          const { token, refreshToken: newRefreshToken } = response.data.data;
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', newRefreshToken);
          
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Only clear tokens and redirect for authenticated users
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        
        // Don't redirect to login for guest users (no token)
        if (hasToken) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // For 401 errors without token (guest users), just reject without redirecting
    return Promise.reject(error);
  }
);

export default api;
