import type { UserProfileData } from "./UserTypes";
import api from "../../config/api";

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
// update hinh dai dien
export const updateProfilePicture = async (file: File): Promise<UserProfileData> => {
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('profilePicture', file);
    console.log("Sending profile picture:", {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
    });

    try {
        const response = await api.patch("/api/user/profilePicture", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Khôi phục header
            }
        });

        console.log("Response from API:", response.data);
        console.log("Response status:", response.status);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
}