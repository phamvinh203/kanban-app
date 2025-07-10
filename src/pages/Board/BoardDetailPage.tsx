import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useBoardDetail } from "../../hooks/Board/useBoardDetail";
import { Loading } from "../../components/common/Loading";
import { Error } from "../../components/common/Error";
import BoardContent from "./BoardContent";
import CreateColumnForm from "../../components/Column/CreateColumnForm";
import { IoMdClose } from "react-icons/io";
import { HiOutlinePlusSm } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";
import BoardShare from "../../components/Board/BoardShare";

const BoardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { board, loading, error, refetch } = useBoardDetail(id || "");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={refetch} />;
  if (!board)
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

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <div>
        {/* Header board detail page*/}
        <div className="bg-white rounded-lg shadow-md px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-blue-200">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 truncate flex-1">
            {board.name}
          </h1>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-1">
              {board.members?.slice(0, 5).map((member, idx) => (
                <div
                  key={member.id}
                  className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-800 text-sm font-semibold -ml-2 first:ml-0 shadow"
                  title={`${member.firstName} ${member.lastName} (${member.role})`}
                  style={{ zIndex: 10 - idx }}
                >
                  {member.firstName.charAt(0)}
                  {member.lastName.charAt(0)}
                </div>
              ))}
              {board.members?.length > 5 && (
                <div
                  className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-semibold -ml-2 shadow"
                  style={{ zIndex: 4 }}
                >
                  +{board.members.length - 5}
                </div>
              )}
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 border border-blue-600 shadow-sm transition"
              onClick={() => setIsShareOpen(true)}
            >
              <FiUserPlus className="w-5 h-5" />
              <span className="hidden md:inline">Chia sẻ</span>
            </button>
          </div>
        </div>

        {/* Chia sẻ bảng */}
        <BoardShare
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          boardId={id || ""}
          members={board.members || []}
          onInviteSuccess={refetch}
          onRoleUpdated={refetch}
        />

        {/* chi tiết bảng */}
        <div>
          <div className="pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Chi tiết bảng
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div className="flex-1">
              <BoardContent boardId={board.id} columns={board.columns} />
            </div>
            <div className="w-full md:w-1/4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-gray-300 mb-2 flex items-center gap-2 text-sm"
              >
                <HiOutlinePlusSm /> Thêm danh sách mới
              </button>
              {showCreateModal && (
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 relative">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    <IoMdClose />
                  </button>
                  <CreateColumnForm
                    boardId={board.id}
                    columns={board.columns}
                    onSuccess={() => {
                      refetch();
                      setShowCreateModal(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetailPage;
