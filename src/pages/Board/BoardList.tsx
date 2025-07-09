import React, { useState, useEffect } from "react";
import { useBoards } from "../../hooks/Board/useBoards";
import { Loading } from "../../components/common/Loading";
import { Error } from "../../components/common/Error";
import BoardCard from "../../components/Board/BoardCard";
import type { Board } from "../../service/BoardServices/boardTypes";
import BoardDeleteDialog from "../../components/Board/BoardDeleteDialog";

const BoardList: React.FC = () => {
  const { boards, loading, error, refetch } = useBoards();
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Debug state changes
  useEffect(() => {}, [selectedBoardId, showDeleteDialog]);

  const handleDeleteClick = (boardId: Board) => {
    setSelectedBoardId(boardId.id);
    setShowDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedBoardId(null);
    setShowDeleteDialog(false);
  };

  // useEffect(() => {
  //   console.log("Danh sách boards:", boards);
  // }, [boards]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />;
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

  // Lọc các board có id trùng nhau
  const uniqueBoards = boards.filter(
    (board, index, self) => index === self.findIndex((b) => b.id === board.id)
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
          <BoardCard
            key={`board-${board.id}`}
            board={board}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>

      {showDeleteDialog && selectedBoardId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <BoardDeleteDialog
            boardId={selectedBoardId}
            onClose={handleCloseDialog}
            onDeleted={() => {
              refetch();
              handleCloseDialog();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BoardList;
