import React, { useState } from 'react';
import { inviteUserToBoard } from '../../service/BoardServices/boardService';
import type { InvitationRequest} from '../../service/BoardServices/boardTypes';

interface BoardFormInviteProps {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
}

const BoardFormInvite: React.FC<BoardFormInviteProps> = ({ isOpen, onClose, boardId }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Kiểm tra boardId hợp lệ
    const boardIdNumber = parseInt(boardId, 10);
    if (isNaN(boardIdNumber)) {
      setError('ID bảng không hợp lệ.');
      setLoading(false);
      return;
    }

    try {
      const invitationData: InvitationRequest = {
        boardId: boardIdNumber,
        email,
      };
      // Log thông tin được gửi
      console.log('Dữ liệu gửi lời mời:', invitationData);

      await inviteUserToBoard(invitationData);
      setSuccess('Lời mời đã được gửi thành công!');
      setEmail(''); 
      setTimeout(() => {
        setSuccess(null);
        onClose(); 
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Lỗi khi gửi lời mời.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mời thành viên</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Nhập email người nhận"
              required
            />
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Đang gửi...' : 'Gửi lời mời'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardFormInvite;