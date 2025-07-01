import type { AuthForm, AuthResponse } from "./AuthTypes";
import api from "../../config/api";

export const sigup = async (data: AuthForm): Promise<AuthResponse> => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const login = async (data: AuthForm): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const refresh = async (refreshToken: string) => {
  const response = await api.post("/auth/refresh", { refreshToken });
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
