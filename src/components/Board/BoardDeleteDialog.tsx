import React, { useState } from "react";
import {
  deleteBoard,
  initDeleteBoard,
} from "../../service/BoardServices/boardService";

interface BoardDeleteDialogProps {
  boardId: number;
  onClose: () => void;
  onDeleted: () => void;
}
const BoardDeleteDialog: React.FC<BoardDeleteDialogProps> = ({
  boardId,
  onClose,
  onDeleted,
}) => {
  const [step, setStep] = useState<"init" | "verify">("init");
  const [verificationCode, setVerificationCode] = useState("");
  const [jwtToken, setJwtToken] = useState(""); // Lưu JWT token từ initDeleteBoard
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInitDelete = async () => {
    try {
      setLoading(true);
      const token = await initDeleteBoard(boardId); // Lấy JWT token
      setJwtToken(token); // Lưu JWT token
      setStep("verify");
    } catch (err: any) {
      setError("Không thể gửi email xác nhận. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteBoard(boardId, verificationCode, jwtToken); // Sử dụng JWT token
      onDeleted();
      onClose();
    } catch (err: any) {
      setError("Xoá bảng không thành công. Vui lòng kiểm tra lại mã xác nhận.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Xác nhận xoá board</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}

      {step === "init" && (
        <>
          <p className="mb-4">
            Một email xác nhận sẽ được gửi đến tài khoản của bạn. Bạn cần nhập
            mã xác nhận để hoàn tất.
          </p>
          <button
            onClick={handleInitDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={loading}
          >
            Gửi email xác nhận
          </button>
        </>
      )}

      {step === "verify" && (
        <>
          <input
            type="text"
            placeholder="Nhập mã xác nhận"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-3"
          />
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={loading || !verificationCode}
          >
            Xoá board
          </button>
        </>
      )}

      <button onClick={onClose} className="text-gray-500 mt-4 hover:underline">
        Huỷ
      </button>
    </div>
  );
};

export default BoardDeleteDialog;
