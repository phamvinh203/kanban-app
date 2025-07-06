import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBoards } from "../../hooks/Board/useBoards";
import type { Board } from "../../service/BoardServices/boardTypes";
import { Loading } from "../common/Loading";

const BoardList: React.FC = () => {
  const { boards, loading, error, refetch } = useBoards();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Danh sách boards:", boards); 
  }, [boards]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={refetch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (boards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          Chưa có bảng nào được tạo
        </div>
        <p className="text-gray-400">
          Hãy tạo bảng đầu tiên để bắt đầu quản lý công việc
        </p>
      </div>
    );
  }

  // ✅ Lọc các board có id trùng nhau
  const uniqueBoards = boards.filter(
    (board, index, self) =>
      index === self.findIndex((b) => b.id === board.id)
  );

  // ✅ Tạo component Card riêng
  const BoardCard: React.FC<{ board: Board }> = ({ board }) => (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/board/${board.id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {board.name}
        </h3>
      </div>

      {board.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{board.description}</p>
      )}

      <div className="border-t border-gray-300 my-4" />

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          <div className="font-medium">
            Người tạo: {board.owner.firstName} {board.owner.lastName}
          </div>
          <div className="font-medium">
            Thời gian tạo:{" "}
            {new Date(board.createdAt).toLocaleDateString("vi-VN")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Danh sách bảng ({uniqueBoards.length})
        </h2>
        <button
          onClick={refetch}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          🔄 Làm mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueBoards.map((board) => (
          <BoardCard key={`board-${board.id}`} board={board} />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
