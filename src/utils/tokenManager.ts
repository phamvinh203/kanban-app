// Utility functions để quản lý token
export const TokenManager = {
  // Lưu tokens
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  },

  // Lấy access token
  getAccessToken: (): string | null => {
    return localStorage.getItem("access_token");
  },

  // Lấy refresh token
  getRefreshToken: (): string | null => {
    return localStorage.getItem("refresh_token");
  },

  // Xóa tất cả tokens
  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  // Kiểm tra user đã đăng nhập
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("access_token");
  },

  // Decode token để lấy thông tin (không verify, chỉ decode)
  decodeToken: (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },

  // Kiểm tra token có hết hạn không
  isTokenExpired: (token: string): boolean => {
    const decoded = TokenManager.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  },
};
