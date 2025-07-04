import { useState, useEffect } from "react";
import { getBoardById } from "../../service/BoardServices/boardService";
import type { Board } from "../../service/BoardServices/boardTypes";

interface UseBoardDetailReturn {
  board: Board | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useBoardDetail = (boardId: string): UseBoardDetailReturn => {
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoard = async () => {
    if (!boardId) {
      setError("ID bảng không hợp lệ");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const boardData = await getBoardById(boardId);
      setBoard(boardData);
    } catch (err: any) {
      console.error("Error fetching board detail:", err);
      setError(err.response?.data?.message || "Không thể tải thông tin bảng");
      setBoard(null);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchBoard();
  };

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  console.log('check board: ', board)

  return {
    board,
    loading,
    error,
    refetch,
  };
};
