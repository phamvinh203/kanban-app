import { useState, useEffect } from "react";
import { createColumn } from "../../service/ColumnServices/columnService";
import type { Columns } from "../../service/ColumnServices/columnTypes";
import { toast } from "react-toastify";

interface CreateColumnFormProps {
    boardId: number | undefined;
    columns: Columns[] | undefined;
    onSuccess: (newColumn: Columns) => void;
}

const CreateColumnForm = ({ boardId, columns, onSuccess }: CreateColumnFormProps) => {
    const [columnLoading, setColumnLoading] = useState(false);
    const [columnTitle, setColumnTitle] = useState("");
    const [columnIndex, setColumnIndex] = useState<number | null>(null);

    useEffect(() => {
        const maxIndex = columns ? Math.max(...columns.map((col) => col.id || 0), -1) : -1;
        setColumnIndex(maxIndex + 1); // Tăng chỉ số cho cột mới
    }, [columns]);

    const handleCreateColumn = async () => {
        if (!boardId || !columnTitle || columnIndex === null) return;
        setColumnLoading(true);
        try {
            const columnData = {
                title: columnTitle,
                columnIndex: columnIndex,
            };
            const newColumn = await createColumn(boardId, columnData); // Giả định API trả về cột mới với id
            onSuccess("Tạo cột thành công!", newColumn); // Trả về cột mới
            setColumnTitle("");
            toast.success('Tạo cột thành công!')
        } catch (e) {
            toast.error('Tạo cột thành công!')
            console.log("check error: ", e);
        } finally {
            setColumnLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xs">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Thêm danh sách</h3>
            <div className="space-y-4">
                <input
                    type="text"
                    value={columnTitle}
                    onChange={(e) => setColumnTitle(e.target.value)}
                    placeholder="Nhập tiêu đề danh sách"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleCreateColumn}
                    disabled={columnLoading || !columnTitle}
                    className={`w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors ${columnLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {columnLoading ? "Đang tạo..." : "Thêm danh sách"}
                </button>
            </div>
        </div>
    );
};

export default CreateColumnForm;