import type { UserProfileData } from "./UserTypes";
import api from "../api";

export const getUser = async (): Promise<UserProfileData> => {
    const token = localStorage.getItem("access_token");
    const response = await api.get("/api/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

export const updateUser = async (data: { firstName: string; lastName: string }): Promise<UserProfileData> => {
    const token = localStorage.getItem('access_token');
    const response = await api.put("/api/user", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}