import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Board } from "../../service/BoardServices/boardTypes";
import { HiDotsVertical } from "react-icons/hi";

interface BoardCardProps {
  board: Board;
  onDeleteClick?: (board: Board) => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onDeleteClick }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleNavigate = () => {
    navigate(`/board/${board.id}`);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer relative"
      onClick={handleNavigate}
    >
      {/* Menu icon */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleMenu}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <HiDotsVertical className="w-6 h-6" />
        </button>
        {showMenu && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowMenu(false);
                onDeleteClick?.(board);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
            >
              🗑️ Xoá bảng
            </button>
              
            <button>
              <span className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                📌 Ghim bảng
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Nội dung chính */}

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {board.name}
        </h3>
      </div>

      {board.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{board.description}</p>
      )}

      <div className="border-t border-gray-300 my-4" />

      <div className="text-sm text-gray-500 space-y-1">
        <div className="font-medium">
          Người tạo: {board.owner.firstName} {board.owner.lastName}
        </div>
        <div className="font-medium">
          Ngày tạo: {new Date(board.createdAt).toLocaleDateString("vi-VN")}
        </div>
        <div>Thành viên: {board.members?.length || 1}</div>
      </div>
    </div>
  );
};

export default BoardCard;
