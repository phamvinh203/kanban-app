import {
    FiHome,
    FiUsers,
    FiBox,
    FiHelpCircle,
    FiLogOut,
    FiAlignJustify,
} from 'react-icons/fi';
import { BsListTask } from "react-icons/bs";
import { CiCreditCard1, CiSettings } from "react-icons/ci";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TokenManager } from "../../utils/tokenManager";


const navItems = [
    { label: 'Home', icon: FiHome, path: '/' },
    { label: 'Tasks', icon: BsListTask, path: '/tasks' },
    { label: 'Users', icon: FiUsers, path: '/users' },
    { label: 'APIs', icon: FiBox, path: '/apis' },
    { label: 'Subscription', icon: CiCreditCard1, path: '/subscription' },
    { label: 'Settings', icon: CiSettings, path: '/settings' },
    { label: 'Help & Support', icon: FiHelpCircle, path: '/help' },
];

const handleLogout = () => {
    TokenManager.clearTokens();
    window.location.href = "/login";
  };

const Sidebar = () => {
    const [showPro, setShowPro] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside
            className={`flex h-screen flex-col bg-slate-900 text-slate-100 transition-all duration-300
            ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            {/* Logo + Toggle */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
                {!isCollapsed && <span className="text-white text-lg font-bold">Kanban App</span>}
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-slate-300">
                    {isCollapsed ? <FiAlignJustify /> : <FiAlignJustify />}
                </button>
            </div>

            {/* Search */}
            {!isCollapsed && (
                <div className="px-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-md bg-slate-800 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
                    />
                </div>
            )}

            {/* Main nav */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 ">
                <ul className="space-y-1">
                    {navItems.map(({ label, icon: Icon, path }) => {
                        const isActive = location.pathname === path;
                        return (
                            <li key={label} className="group relative">
                                <Link
                                    to={path}
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
                    ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <Icon
                                        size={20}
                                        className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                                    />
                                    {!isCollapsed && <span>{label}</span>}
                                </Link>
                                {isCollapsed && (
                                    <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-slate-700 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">
                                        {label}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Pro section */}
                {!isCollapsed && showPro && (
                    <div className="mt-8 rounded-md bg-slate-800 p-4 text-sm text-slate-300">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="mb-2 text-slate-200 font-semibold">Enjoy unlimited access</p>
                                <p className="text-xs text-slate-400">
                                    Unlock all features with just a small monthly fee.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowPro(false)}
                                className="ml-2 text-xs text-slate-400 hover:text-slate-200"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mt-3 text-left flex justify-between">
                            <a
                                href="#"
                                className="text-sm text-indigo-400 font-medium hover:underline"
                            >
                                Dismiss
                            </a>
                            <a
                                href="#"
                                className="text-sm text-indigo-400 font-medium hover:underline"
                            >
                                Go Pro
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Avatar */}
            <div className="flex items-center border-t border-slate-800 px-4 py-4 justify-between">
                <div className="flex items-center">
                    <img
                        src="https://avatars.githubusercontent.com/u/194400?&s=40"
                        alt="avatar"
                        className="h-8 w-8 rounded-full"
                    />
                    {!isCollapsed && (
                        <div className="ml-3 text-sm">
                            <div className="font-medium">Tom Cook</div>
                            <div className="text-xs text-slate-400">Basic Member</div>
                        </div>
                    )}
                </div>
                {!isCollapsed && (
                    <button onClick={handleLogout}>
                        <FiLogOut className="text-slate-400 hover:text-white" />
                    </button>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
