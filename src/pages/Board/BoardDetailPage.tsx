import React from "react";
import { useParams } from "react-router-dom";
import { useBoardDetail } from "../../hooks/Board/useBoardDetail";
import { Loading } from "../../components/common/Loading";

const BoardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { board, loading, error } = useBoardDetail(id || "");

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Quay lại
        </button>
      </div>
    );
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

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
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
            <p className="text-2xl font-bold text-blue-600">
              {board.totalCards}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">👥 Thành viên</h3>
            <p className="text-2xl font-bold text-green-600">
              {board.numberOfMembers}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">👤 Chủ sở hữu</h3>
            <p className="text-lg font-medium">
              {board.owner.firstName} {board.owner.lastName}
            </p>
            <p className="text-sm text-gray-500">
              Tạo ngày: {new Date(board.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* thêm các component  columns, cards, */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Chi tiết bảng
          </h2>
          <p className="text-gray-600">
            Tính năng quản lý cột và thẻ sẽ được phát triển tiếp...
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoardDetailPage;
