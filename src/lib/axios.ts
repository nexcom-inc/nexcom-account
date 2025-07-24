import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/auth';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         }).then(() => apiClient(originalRequest));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         await authAPI.refreshToken();
//         processQueue(null);
//         return apiClient(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         useAuthStore.getState().logout();
//         if (typeof window !== 'undefined') {
//           window.location.href = '/auth/login';
//         }
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await apiClient.post('/refresh');
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         useAuthStore.getState().logout();
//         if (typeof window !== 'undefined') {
//           window.location.href = '/auth/login';
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
