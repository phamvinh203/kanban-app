import api from "../../config/api";
import type { Card, CardFormInput } from "./cardTypes";

// POST /api/card - Create a new card
export const createCard = async (
  boardId: number,
  cardData: CardFormInput
): Promise<Card> => {
  const res = await api.post(`/api/card?boardId=${boardId}`, cardData);
  return res.data;
};

// GET /api/card/{cardId} - Get card details (if needed)
export const getCardById = async (cardId: number): Promise<Card> => {
  const res = await api.get(`/api/card/${cardId}`);
  return res.data;
};

// PATCH /api/card/{cardId}/join - Add assignees to card
export const addAssigneesToCard = async (
  boardId: number,
  cardId: number,
  assigneesIds: number[]
): Promise<Card> => {
  const res = await api.patch(`/api/card/${cardId}/join?boardId=${boardId}`, {
    assigneesIds,
  });
  return res.data;
};

// PATCH /api/card/{cardId}/cover - Add cover image to card

