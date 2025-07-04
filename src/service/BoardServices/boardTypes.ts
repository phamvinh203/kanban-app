import type { Columns } from "../ColumnServices/columnTypes";

export interface BoardOwner {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: string;
}

export interface Board {
  id: number;
  name: string;
  updateAt: string;
  createdAt: string;
  isPinned: boolean;
  description: string;
  totalCards: number;
  numberOfMembers: number;
  owner: BoardOwner;
  columns: Columns[];
}

export interface BoardFormInput {
  name: string;
  description?: string;
  isPinned?: boolean;
}

// Board invite
export interface InvitationRequest {
  boardId: number;
  email: string;
}

export interface InvitationResponse {
  token: string;
}