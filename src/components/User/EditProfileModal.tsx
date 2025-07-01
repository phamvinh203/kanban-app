import { useState } from "react";

interface Props {
    initialFirstName: string;
    initialLastName: string;
    onClose: () => void;
    onSave: (firstName: string, lastName: string) => void
}
const EditProfileModal = ({ initialFirstName, initialLastName, onClose, onSave }: Props) => {
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Chỉnh sửa thông tin</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600 hover:underline"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(firstName, lastName)}
                        className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
export default EditProfileModal;