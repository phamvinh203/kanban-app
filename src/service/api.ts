import axios from "axios";
import { TokenManager } from "../utils/tokenManager";

const api = axios.create({
  baseURL: "http://10.10.41.25:3000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor để thêm token vào header
api.interceptors.request.use((config) => {
  const token = TokenManager.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor để xử lý response và refresh token nếu cần
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = TokenManager.getRefreshToken();
      if (refreshToken) {
        try {
          // Gọi API refresh token
          const response = await api.post("/auth/refresh", {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token: newRefreshToken } =
            response.data;
          TokenManager.setTokens(access_token, newRefreshToken);

          // Retry request với token mới
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh token không hợp lệ, logout user
          TokenManager.clearTokens();
          window.location.href = "/login";
        }
      } else {
        // Không có refresh token, logout user
        TokenManager.clearTokens();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
