// Tạo mới board

import { useState } from "react";
import type {
  Board,
  BoardFormInput,
} from "../../service/BoardServices/boardTypes";
import { createBoard } from "../../service/BoardServices/boardService";

export const useCreateBoard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: BoardFormInput): Promise<Board | null> => {
    setLoading(true);
    setError(null);
    try {
      const board = await createBoard(data);
      return board;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create board";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    loading,
    error,
    setError,
  };
};
