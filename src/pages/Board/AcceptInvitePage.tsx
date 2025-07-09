import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { acceptBoardInvitation } from "../../service/BoardServices/boardService";
import type { Board } from "../../service/BoardServices/boardTypes";
import { Loading } from "../../components/common/Loading";
import { Error } from "../../components/common/Error";

const AcceptInvitationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("Token không hợp lệ.");
      setLoading(false);
      return;
    }

    const handleAcceptInvitation = async () => {
      try {
        const board: Board = await acceptBoardInvitation(token);
        setSuccess(`Bạn đã tham gia bảng "${board.name}" thành công!`);

        // console.log("Thông tin board nhận được:", board);

        setTimeout(() => {
          navigate("/dashboard?refresh=true");
        }, 2000);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Lỗi khi chấp nhận lời mời.";
        if (err.response?.status === 401) {
          setError("Bạn cần đăng nhập để chấp nhận lời mời.");
        } else if (err.response?.status === 400) {
          setError("Token không hợp lệ hoặc đã hết hạn.");
        } else {
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    handleAcceptInvitation();
  }, [searchParams, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        {error && <Error message={error} onRetry={() => navigate("/")} />}
        {success && (
          <>
            <p className="text-green-600 mb-4">{success}</p>
            <p className="text-gray-600">Đang chuyển hướng...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptInvitationPage;
