import { useState, useEffect } from "react";
import TaskCard from "../../components/Card/TaskCard";
import CardForm from "../../components/Board/CardForm";
import type { Columns } from "../../service/ColumnServices/columnTypes";
import type { Card } from "../../service/CardServies/cardTypes";
import { HiDotsVertical } from "react-icons/hi";

interface BoardContentProps {
  boardId: number;
  columns: Columns[] | undefined;
}

const BoardContent = ({
  boardId,
  columns: initialColumns,
}: BoardContentProps) => {
  const [columns, setColumns] = useState(initialColumns);
  const [showCardForm, setShowCardForm] = useState<{
    columnId: number;
    rowIndex: number;
  } | null>(null);

  useEffect(() => {
    setColumns(initialColumns); // Cập nhật khi prop thay đổi
  }, [initialColumns]);

  const handleCardCreated = (newCard: Card) => {
    setColumns((prevColumns) =>
      prevColumns?.map((column) =>
        column.id === newCard.columnId
          ? { ...column, cards: [...column.cards, newCard] }
          : column
      )
    );
    setShowCardForm(null);
  };

  const handleCardUpdated = (updatedCard: Card) => {
    setColumns((prevColumns) =>
      prevColumns?.map((column) =>
        column.id === updatedCard.columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === updatedCard.id ? updatedCard : card
              ),
            }
          : column
      )
    );
  };

  const handleAddCard = (columnId: number) => {
    const column = columns?.find((col) => col.id === columnId);
    const rowIndex = column?.cards.length || 0;
    setShowCardForm({ columnId, rowIndex });
  };

  return (
    <div className="flex bg-gray-100 p-4">
      <div className="flex-1 flex space-x-4">
        {columns && columns.length > 0 ? (
          columns.map((column) => (
            <div
              key={column.id}
              className="w-1/3 bg-white rounded-lg shadow-sm p-3 border border-gray-200"
            >
              
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="ml-2">{column.title}</span>
                <button className="ml-auto text-gray-500 hover:text-gray-700">
                  <HiDotsVertical className="w-5 h-5" />
                </button>
              </h2>

              <div className="space-y-4">
                {column.cards.map((card: Card, index: number) => (
                  <TaskCard
                    key={card.id || index}
                    // card={card}
                    // boardId={boardId}
                    // availableUsers={[]} // You can pass board members here
                    // onCardUpdate={handleCardUpdated}
                    // Legacy support for old card format
                    title={card.title || ""}
                    // labels={card.labels || []}
                    // assignees={card.assignees || []}
                    date={
                      card.createdAt
                        ? new Date(card.createdAt).toLocaleDateString()
                        : ""
                    }
                    // tags={(card as any).tags || []}
                    // avatars={(card as any).avatars || []}
                  />
                ))}

                {showCardForm?.columnId === column.id ? (
                  <CardForm
                    boardId={boardId}
                    columnId={column.id}
                    rowIndex={showCardForm.rowIndex}
                    onCardCreated={handleCardCreated}
                    onCancel={() => setShowCardForm(null)}
                  />
                ) : (
                  <button
                    onClick={() => handleAddCard(column.id)}
                    className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
                  >
                    + Thêm thẻ
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center w-full text-gray-500">
            Không có cột nào để hiển thị.
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardContent;
