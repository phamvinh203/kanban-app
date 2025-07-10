import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  inviteUserToBoard,
  updateBoardMemberRole,
} from "../../service/BoardServices/boardService";
import type {
  InvitationRequest,
  BoardMember,
} from "../../service/BoardServices/boardTypes";

interface BoardShareProps {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
  members: BoardMember[];
  onRoleUpdated?: (memberId: number, newRole: string) => void;
  onInviteSuccess?: () => void;
}

const ROLE_OPTIONS = ["ADMIN", "CONTRIBUTOR", "OBSERVER"];

const BoardShare: React.FC<BoardShareProps> = ({
  isOpen,
  onClose,
  boardId,
  members,
  onRoleUpdated,
  onInviteSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CONTRIBUTOR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const boardIdNumber = parseInt(boardId, 10);
    if (isNaN(boardIdNumber)) {
      setError("ID bảng không hợp lệ.");
      setLoading(false);
      return;
    }

    try {
      const invitationData: InvitationRequest = {
        boardId: boardIdNumber,
        email,
      };
      await inviteUserToBoard(invitationData);
      setSuccess("✅ Đã gửi lời mời!");
      setEmail("");
      if (onInviteSuccess) onInviteSuccess();
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 2000);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Lỗi khi gửi lời mời.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (memberId: number, newRole: string) => {
    try {
      await updateBoardMemberRole(parseInt(boardId, 10), memberId, newRole);
      if (onRoleUpdated) onRoleUpdated(memberId, newRole);
    } catch (err: any) {
      alert("❌ Lỗi khi cập nhật vai trò");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chia sẻ bảng</h2>

        <form onSubmit={handleInvite} className="flex gap-2 mb-4">
          <input
            type="email"
            placeholder="Địa chỉ email"
            className="flex-1 border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="CONTRIBUTOR">Thành viên</option>
            <option value="ADMIN">Quản trị viên</option>
            <option value="OBSERVER" disabled>
              Quan sát viên
            </option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Chia sẻ"}
          </button>
        </form>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">
            Thành viên của bảng ({members.length})
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center border rounded p-2"
              >
                <div>
                  <p className="font-medium">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                <select
                  value={member.role}
                  onChange={(e) => handleChangeRole(member.id, e.target.value)}
                  className="border p-1 rounded text-sm"
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r === "ADMIN"
                        ? "Quản trị viên"
                        : r === "CONTRIBUTOR"
                        ? "Thành viên"
                        : "Quan sát viên"}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardShare;
