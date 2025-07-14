import React, { useState, useEffect } from "react";
import { createCard } from "../../service/CardServies/cardService";
import type { CardFormInput } from "../../service/CardServies/cardTypes";
// import type { Label } from "../../service/LabelServices/labelTypes";

interface CardFormProps {
  boardId: number;
  columnId: number;
  rowIndex: number;
  onCardCreated: (card: any) => void;
  onCancel: () => void;
}

const CardForm: React.FC<CardFormProps> = ({
  boardId,
  columnId,
  rowIndex,
  onCardCreated,
  onCancel,
}) => {
  const [formData, setFormData] = useState<CardFormInput>({
    title: "",
    columnId,
    rowIndex,
    description: "",
    assigneesIds: [],
    labelsIds: [],
  });

  // const [availableLabels, setAvailableLabels] = useState<Label[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      const newCard = await createCard(boardId, formData);
      onCardCreated(newCard);
    } catch (error) {
      console.error("Error creating card:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLabel = (labelId: number) => {
    setFormData((prev) => ({
      ...prev,
      labelsIds: prev.labelsIds?.includes(labelId)
        ? prev.labelsIds.filter((id) => id !== labelId)
        : [...(prev.labelsIds || []), labelId],
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
    >
      <div>
        <input
          type="text"
          placeholder="Enter card title..."
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      </div>

      <div>
        <textarea
          placeholder="Add a description..."
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
        />
      </div>

      {/* {availableLabels.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Labels
          </label>
          <div className="flex flex-wrap gap-2">
            {availableLabels.map((label) => (
              <div
                key={label.id}
                onClick={() => toggleLabel(label.id)}
                className={`cursor-pointer transition-opacity ${
                  formData.labelsIds?.includes(label.id)
                    ? "opacity-100"
                    : "opacity-50"
                }`}
              >
              </div>
            ))}
          </div>
        </div>
      )} */}

      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={isSubmitting || !formData.title.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Add Card"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CardForm;
