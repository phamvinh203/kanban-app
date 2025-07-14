import type { Label } from "../LabelServices/labelTypes";

export interface Assignee {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  rowIndex: number;
  columnId: number;
  cover?: string;
  assignees?: Assignee[];
  labels?: Label[];
  createdAt: string;
  updatedAt: string;
}

export interface CardFormInput {
  title: string;
  columnId: number;
  rowIndex: number;
  description: string;
  assigneesIds?: number[];
  labelsIds?: number[];
}

export interface AssigneeJoinRequest {
  assigneesIds: number[];
}
