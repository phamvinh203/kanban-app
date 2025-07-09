import { useEffect, useState } from "react";
import type { Board } from "../../service/BoardServices/boardTypes";
import { getBoards } from "../../service/BoardServices/boardService";

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBoards();
      setBoards(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải boards"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {      
    fetchBoards();
  }, []);

  const refetch = () => {
    fetchBoards();
  };

  return {
    boards,
    loading,
    error,
    refetch,
  };
};
