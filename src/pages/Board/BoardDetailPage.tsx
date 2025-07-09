import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useBoardDetail } from "../../hooks/Board/useBoardDetail";
import { Loading } from "../../components/common/Loading";
import { Error } from "../../components/common/Error";
import BoardContent from "./BoardContent";
import CreateColumnForm from "../../components/Column/CreateColumnForm";
import { IoMdClose } from "react-icons/io";
import { HiOutlinePlusSm } from "react-icons/hi";
import BoardFormInvite from "../../components/Board/BoardFormInvite";

const BoardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { board, loading, error, refetch } = useBoardDetail(id || "");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleShowModal = () => {
    setShowCreateModal(true);
  };
  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateColumnSuccess = () => {
    refetch(); 
    setShowCreateModal(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />;
  }

  if (!board) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">Không tìm thấy bảng</div>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Quay lại
        </button>
      </div>
    );
  }

  console.log("📋 Board data:", board);

  // Tính toán totalCards từ columns
  const totalCards =
    board.columns?.reduce((total, column) => {
      return total + (column.cards?.length || 0);
    }, 0) || 0;

  // Tính toán numberOfMembers từ members array
  const numberOfMembers = board.members?.length || 0;

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Quay lại
          </button>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {board.name}
            </h1>
            {board.description && (
              <p className="text-gray-600">{board.description}</p>
            )}
          </div>
          {/* {board.isPinned && (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              📌 Ghim
            </span>
          )} */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">📋 Tổng số thẻ</h3>
            <p className="text-2xl font-bold text-blue-600">{totalCards}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">👥 Thành viên</h3>
            <p className="text-2xl font-bold text-green-600">
              {numberOfMembers}
            </p>
            {/* Hiển thị danh sách members */}
            <div className="mt-2 flex flex-wrap gap-1">
              {board.members?.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                  title={`${member.firstName} ${member.lastName} (${member.role})`}
                >
                  {member.firstName.charAt(0)}
                  {member.lastName.charAt(0)}
                </div>
              ))}
              {board.members && board.members.length > 3 && (
                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  +{board.members.length - 3}
                </div>
              )}
            </div>
          </div>
          <button
            className="bg-gray-50 p-4 rounded-lg"
            onClick={() => setIsInviteModalOpen(true)}
          >
            <h3 className="font-semibold text-gray-700 mb-2">Share</h3>
          </button>
        </div>

        <BoardFormInvite
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          boardId={id || ""}
        />

        {/* thêm các component  columns, cards, */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Chi tiết bảng
          </h2>
          <p className="text-gray-600">
            Tính năng quản lý cột và thẻ sẽ được phát triển tiếp...
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex-1">
            <BoardContent boardId={board.id} columns={board.columns} />
          </div>
          <div className="w-full md:w-1/4">
            <button
              onClick={handleShowModal}
              className="w-full bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-gray-300 mb-2 flex items-center gap-2 text-sm"
            >
              <HiOutlinePlusSm /> Thêm danh sách mới
            </button>
            {showCreateModal && (
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div className="relative">
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    <IoMdClose />
                  </button>
                  <CreateColumnForm
                    boardId={board.id}
                    columns={board.columns}
                    onSuccess={handleCreateColumnSuccess}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetailPage;
