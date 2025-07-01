import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Dashboard from "../pages/Dashboard";
import { TokenManager } from "../utils/tokenManager";

// Component bảo vệ route yêu cầu authentication
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!TokenManager.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Component redirect cho user đã đăng nhập
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (TokenManager.isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoute: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes - chỉ truy cập khi chưa đăng nhập */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected routes - yêu cầu đăng nhập */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Default routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
