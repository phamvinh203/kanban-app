import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import BoardForm from "../components/Board/BoardForm";
import BoardList from "../components/Board/BoardList";
import { useCreateBoard } from "../hooks/Board/useCreateBoard";
import { useBoards } from "../hooks/Board/useBoards";
import type { BoardFormInput } from "../service/BoardServices/boardTypes";

const Dashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const { create, loading, error } = useCreateBoard();
  const { refetch } = useBoards();

  // Check if we need to refresh boards after accepting invitation
  useEffect(() => {
    const shouldRefresh = searchParams.get("refresh");
    if (shouldRefresh === "true") {
      refetch();
      // Remove the refresh parameter from URL
      searchParams.delete("refresh");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, refetch]);

  const handleCreateBoard = async (data: {
    name: string;
    description: string;
  }) => {
    // Chuyển đổi dữ liệu từ form sang BoardPayload
    const boardFormInput: BoardFormInput = {
      name: data.name,
      description: data.description,
      isPinned: false,
    };

    // Gọi API tạo board
    const result = await create(boardFormInput);

    if (result) {
      console.log("Tạo board thành công:", result);
      setShowDropdown(false);
      // Refresh danh sách board sau khi tạo thành công
      refetch();
    } else {
      console.error("Lỗi tạo board:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Kanban Board</h1>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
              <BsBell className="w-6 h-6" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                + Tạo bảng
              </button>

              <BoardForm
                isOpen={showDropdown}
                onClose={() => setShowDropdown(false)}
                onCreate={handleCreateBoard}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <BoardList />
      </main>
    </div>
  );
};

export default Dashboard;
