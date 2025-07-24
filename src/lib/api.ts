import { apiClient } from "./axios";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface UserData {
  name: string;
  email: string;
  password?: string;
}

export const authAPI = {
  login: (credentials: AuthCredentials) => apiClient.post("/login", credentials),
  register: (userData: UserData) => apiClient.post("/register", userData),
  logout: () => apiClient.post("/logout"),
  getProfile: () => apiClient.get("/me"),
  refreshToken: () => apiClient.post("/refresh-token"),
};

export const userAPI = {
    getProfile: () => apiClient.get("/users/me"),
}
