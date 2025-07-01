import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthForm } from "../../service/AuthServices/AuthTypes";
import { login, sigup } from "../../service/AuthServices/authService";
import { TokenManager } from "../../utils/tokenManager";

// Hook chung cho logic đăng nhập và đăng ký
export const useAuth = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<AuthForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Xử lý input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Đăng ký
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await sigup(form);
      navigate("/login");
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Đăng nhập
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(form);
      TokenManager.setTokens(res.access_token, res.refresh_token);
      navigate("/dashboard");
    } catch (err) {
      setError("Email hoặc mật khẩu không đúng.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleLogin,
    handleRegister,
  };
};
