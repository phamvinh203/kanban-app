import api from "../../config/api";
import axios from "axios";
import type { Board, BoardFormInput, InvitationRequest } from "./boardTypes";

// POST /api/board – Tạo mới board
export const createBoard = async (data: BoardFormInput): Promise<Board> => {
  const res = await api.post("/api/board", data);
  return res.data;
};

// GET /api/board/owned – Lấy danh sách board do user sở hữu
export const getOwnedBoards = async (): Promise<Board[]> => {
  const res = await api.get("/api/board/owned");
  return res.data;
};

// GET /api/board – Lấy danh sách board
export const getBoards = async (): Promise<Board[]> => {
  const res = await api.get("/api/board");
  return res.data;
};

// GET /api/board/{id} – Lấy chi tiết 1 board
export const getBoardById = async (id: number | string): Promise<Board> => {
  const res = await api.get(`/api/board/${id}`);
  return res.data;
};

// PATCH /api/board/{boardId} – Cập nhật thông tin board
export const updateBoard = async (
  boardId: number,
  data: Partial<BoardFormInput>
): Promise<Board> => {
  const res = await api.patch(`/api/board/${boardId}`, data);
  return res.data;
};

// POST /api/board/delete/{boardId}/init – Khởi tạo thao tác xoá – Gửi email xác nhận xoá board
export const initDeleteBoard = async (boardId: number): Promise<string> => {
  const res = await api.post(`/api/board/delete/${boardId}/init`);
  return res.data;
};

// DELETE /api/board/{boardId} – Xoá board verification token
export const deleteBoard = async (
  boardId: number,
  verificationCode: string,
  jwtToken: string
): Promise<void> => {
  await api.delete(`/api/board/${boardId}`, {
    data: {
      token: jwtToken,
      verificationCode: verificationCode,
    },
  });
  console.log("Board deleted successfully");
};

// Board invite

// POST /api/board/invite/new – Mời người dùng vào board
export const inviteUserToBoard = async (
  data: InvitationRequest
): Promise<{ token: string }> => {
  const res = await api.post("/api/board/invite/new", data);
  return res.data;
};

// PUT /api/board/invite/accept – Chấp nhận lời mời vào board
export const acceptBoardInvitation = async (token: string): Promise<Board> => {
  const res = await api.put(`/api/board/invite/accept?token=${token}`);
  return res.data;
};
