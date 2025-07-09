import type { Columns } from "../ColumnServices/columnTypes";
// Thông tin chủ sở hữu board
export interface BoardOwner {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  isAdmin?: boolean;
}

// Thành viên trong board
export interface BoardMember {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  role: string;
  isAdmin: boolean;
}

// Giao diện chính của một bảng công việc
export interface Board {
  id: number;
  name: string;
  updateAt: string;
  createdAt: string;
  isPinned: boolean;
  description: string;
  background: string | null;

  owner: BoardOwner;
  columns: Columns[];
  members: BoardMember[];

  // Computed fields - sẽ tính toán từ dữ liệu có sẵn
  totalCards?: number;
  numberOfMembers?: number;
}

// Giao diện dùng cho form tạo/sửa boar
export interface BoardFormInput {
  name: string;
  description?: string;
  isPinned?: boolean;
  background?: string | null;
}

// Board invite
export interface InvitationRequest {
  boardId: number;
  email: string;
}

export interface InvitationResponse {
  token: string;
}
