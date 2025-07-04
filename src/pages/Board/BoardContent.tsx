import { useState, useEffect } from "react";
import TaskCard from "../../components/Board/TaskCard"
import type { Columns } from "../../service/ColumnServices/columnTypes";

interface BoardContentProps {
    boardId: number;
    columns: Columns[] | undefined;
}

const BoardContent = ({ boardId, columns: initialColumns }: BoardContentProps) => {
    const [columns, setColumns] = useState(initialColumns);
    useEffect(() => {
        setColumns(initialColumns); // Cập nhật khi prop thay đổi
    }, [initialColumns]);
    return (
        <div className="flex min-h-screen bg-gray-100 p-4">
            <div className="flex-1 flex justify-between space-x-4">
                {columns && columns.length > 0 ? (
                    columns.map((column) => (
                        <div key={column.id} className="w-1/3 bg-white rounded-lg shadow-sm p-3 border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="ml-2">{column.title}</span>
                                <span className="ml-auto text-gray-500">⋮</span>
                            </h2>
                            <div className="space-y-4">
                                {column.cards.map((task: any, index: number) => (
                                    <TaskCard
                                        key={index}
                                        title={task.title || ""}
                                        tags={task.tags || []}
                                        date={task.date || ""}
                                        avatars={task.avatars || []}
                                    />
                                ))}
                                <button className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200">
                                    + Thêm thẻ
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center w-full text-gray-500">Không có cột nào để hiển thị.</div>
                )}
            </div>
        </div>
    )
}

export default BoardContent