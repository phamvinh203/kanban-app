import { useAuth } from "../hooks/Auth/useAuth";
import AuthInput from "../components/Auth/AuthInput";

const RegisterPage = () => {
  const { form, loading, error, handleChange, handleRegister } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* branding */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Kanban</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Tạo tài khoản mới
          </h2>
        </div>

        {/* Form card */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-200">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <AuthInput
                  id="firstName"
                  name="firstName"
                  label="Họ"
                  value={form.firstName || ""}
                  onChange={handleChange}
                />
                <AuthInput
                  id="lastName"
                  name="lastName"
                  label="Tên"
                  value={form.lastName || ""}
                  onChange={handleChange}
                />
              </div>
              <AuthInput
                id="email"
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                type="email"
              />
              <AuthInput
                id="password"
                name="password"
                label="Mật khẩu"
                value={form.password}
                onChange={handleChange}
                type="password"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang đăng ký...
                  </div>
                ) : (
                  "Tạo tài khoản"
                )}
              </button>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Có lỗi xảy ra
                    </h3>
                    <div className="mt-2 text-sm text-red-700">{error}</div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
            >
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
