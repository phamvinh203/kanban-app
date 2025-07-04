import api from "../../config/api";
import type { Columns } from "./columnTypes";

// Tạo mới 1 cột với bảng được cung cấp
export const createColumn = async (
    boardId: number,
    columnData: { title: string; columnIndex: number }
): Promise<Columns> => {
    const res = await api.post(`/api/column/${boardId}`, columnData);
    return res.data;
}
