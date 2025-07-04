import { useState } from "react";

interface Props {
    initialFirstName: string;
    initialLastName: string;
    initialProfilePicture?: string
    onClose: () => void;
    onSave: (firstName: string, lastName: string, profilePicture?: File) => void
}
const EditProfileModal = ({ initialFirstName, initialLastName, initialProfilePicture, onClose, onSave }: Props) => {
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfilePicture(file);
        }
    };

    const handleSave = () => {
        onSave(firstName, lastName, profilePicture || undefined); // Chuyển null thành undefined
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
                <h3 className="text-xl font-bold text-gray-800 mb-5 border-b-2 border-blue-500 pb-2">Chỉnh sửa thông tin</h3>
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                    <div className="mt-2">
                        {initialProfilePicture && (
                            <img
                                src={initialProfilePicture}
                                alt="Current Profile"
                                className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-gray-200"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
export default EditProfileModal;