import { useState } from 'react';
import myImage from '../../assets/user/userProfile.png';
import { useUserProfile } from '../../hooks/useUserProfile';
import EditProfileModal from './EditProfileModal';

const UserProfile = () => {
    const { user, loading, editUser } = useUserProfile();
    const [showModal, setShowModal] = useState(false);

    if (loading) return <div className="p-8">Loading....</div>;
    if (!user) return <div className="p-8">Không tìm thấy người dùng</div>;
    return (
        <div className="w-full bg-white rounded-lg shadow p-8 mt-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <img
                        src={user.profilePicture || myImage}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                        <div className="flex items-center space-x-2">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {user.firstName} {user.lastName}
                            </h2>
                            <span className={`text-sm font-medium px-2 py-1 rounded-full ${user.isAdmin ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                {user.isAdmin ? 'Admin ✓ ' : 'User ✓ '}
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                </div>
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                    onClick={() => setShowModal(true)}
                >
                    Edit
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">First Name</label>
                    <input
                        type="text"
                        value={user.firstName}
                        readOnly
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                    <input
                        type="text"
                        value={user.lastName}
                        readOnly
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-gray-100"
                    />
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">My email Address</h3>
                <div className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-3 mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                            📧
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800">{user.email}</p>
                        </div>
                    </div>
                </div>
                <button className="px-4 py-2 text-blue-600 text-sm rounded-md hover:underline hover:text-blue-700">
                    + Add Email Address
                </button>
            </div>

            {showModal && (
                <EditProfileModal
                    initialFirstName={user.firstName}
                    initialLastName={user.lastName}
                    onClose={() => setShowModal(false)}
                    onSave={async (first, last) => {
                        const success = await editUser(first, last);
                        if (success) setShowModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default UserProfile;
