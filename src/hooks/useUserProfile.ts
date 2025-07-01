import { useState, useEffect } from "react";
import { getUser, updateUser } from "../service/UserServices/userService";
import type { UserProfileData } from "../service/UserServices/UserTypes";
import { toast } from 'react-toastify';

export const useUserProfile = () => {
    const [user, setUser] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const data = await getUser();
            setUser(data);
        } catch (error) {
            console.error("Lỗi khi tải thông tin người dùng:", error);
            toast.error("Không thể tải thông tin người dùng");
        } finally {
            setLoading(false);
        }
    };
    const editUser = async (firstName: string, lastName: string) => {
        try {
            const updated = await updateUser({ firstName, lastName });
            setUser(prev => prev ? { ...prev, ...updated } : updated)
            toast.success("Cập nhật thành công!......");
            return true;
        } catch (err) {
            toast.error("Cập nhật thất bại");
            console.error(err);
            return false;
        }
    };

    useEffect(() => {
        loadUser();
    }, [])

    return {
        user,
        loading,
        editUser,
        reload: loadUser,
    };
};