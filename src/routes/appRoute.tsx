import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebar/Sidebar";
import { TokenManager } from "../utils/tokenManager";
import UserProfile from "../components/User/UserProfile";

// Protected wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return TokenManager.isAuthenticated()
        ? <>{children}</>
        : <Navigate to="/login" replace />;
};

// Public wrapper component
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return TokenManager.isAuthenticated()
        ? <Navigate to="/dashboard" replace />
        : <>{children}</>;
};

// Layout with Sidebar (chỉ hiển thị khi đăng nhập)
const ProtectedLayout: React.FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 bg-slate-800 p-6 overflow-auto h-screen">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<div>Tasks Page</div>} />
                    <Route path="/users" element={<UserProfile />} />
                    <Route path="/apis" element={<div>API Page</div>} />
                    <Route path="/subscription" element={<div>Subscription Page</div>} />
                    <Route path="/settings" element={<div>Settings Page</div>} />
                    <Route path="/help" element={<div>Help Page</div>} />
                </Routes>
            </main>
        </div>
    );
};

const AppRoute: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
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

                {/* Protected Routes (layout with sidebar) */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout />
                        </ProtectedRoute>
                    }
                />

                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoute;
