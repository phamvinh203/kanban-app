
import React from "react";

interface BoardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    description: string;
    visibility: string;
    background: string;
  }) => Promise<void> | void;
  loading?: boolean;
}

const backgrounds = [
  "#60A5FA",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
];

const BoardForm: React.FC<BoardFormProps> = ({
  isOpen,
  onClose,
  onCreate,
  loading = false,
}) => {
  const [boardName, setBoardName] = React.useState("");
  const [boardDescription, setBoardDescription] = React.useState("");
  const [visibility, setVisibility] = React.useState("workspace");
  const [background, setBackground] = React.useState("#60A5FA");

  const handleSubmit = async () => {
    if (!boardName.trim()) return;

    await onCreate({
      name: boardName,
      description: boardDescription,
      visibility,
      background,
    });

    // Reset form chỉ khi không có lỗi
    setBoardName("");
    setBoardDescription("");
    setVisibility("workspace");
    setBackground("#60A5FA");
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white border rounded shadow-lg z-50 p-4 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Tạo bảng mới</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-xl leading-none"
          title="Đóng"
        >
          &times;
        </button>
      </div>

      {/* Preview */}
      <div className="h-24 rounded" style={{ backgroundColor: background }} />

      {/* Backgrounds */}
      <div>
        <label className="block text-sm font-medium mb-1">Phông nền</label>
        <div className="flex flex-wrap gap-2">
          {backgrounds.map((color) => (
            <button
              key={color}
              onClick={() => setBackground(color)}
              className={`w-8 h-8 rounded-full border-2 ${
                background === color ? "border-gray-800" : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Tên bảng */}
      <div>
        <label className="block text-sm font-medium mb-1">Tiêu đề bảng *</label>
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Nhập tên bảng"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Mô tả */}
      <div>
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <textarea
          value={boardDescription}
          onChange={(e) => setBoardDescription(e.target.value)}
          placeholder="Mô tả bảng..."
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        />
      </div>

      {/* Quyền xem */}
      <div>
        <label className="block text-sm font-medium mb-1">Quyền xem</label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="workspace">Không gian làm việc</option>
          <option value="private">Riêng tư</option>
          <option value="public">Công khai</option>
        </select>
      </div>

      {/* Nút tạo */}
      <button
        onClick={handleSubmit}
        disabled={!boardName.trim() || loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Đang tạo..." : "Tạo bảng"}
      </button>
    </div>
  );
};

export default BoardForm;
