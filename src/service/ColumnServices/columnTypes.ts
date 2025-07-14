import type { Card } from "../CardServies/cardTypes";

export interface Columns {
  id: number;
  title: string;
  columnIndex: number;
  cards: Card[];
  updateAt: string;
  createAt: string;
}
