import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Newspaper,
    Users,
    FolderKanban,
    CreditCard,
} from 'lucide-react';

const Admin = () => {
    const location = useLocation();

    const menus = [
        {
            name: 'Admin Dashboard',
            path: '/dashboard/AdminHome',
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: 'Create News Post',
            path: 'newspost',
            icon: <Newspaper size={20} />,
        },
        {
            name: 'Applicant List',
            path: 'applidlist',
            icon: <Users size={20} />,
        },
        {
            name: 'Manage Categories',
            path: 'addcategory',
            icon: <FolderKanban size={20} />,
        },
        {
            name: 'Payment Records',
            path: 'paymentList',
            icon: <CreditCard size={20} />,
        },
        {
            name: 'Back to Home',
            path: '/',
            icon: <CreditCard size={20} />,
        },
    ];

    return (
        <div className="w-full">

            {/* Logo */}
            <div className="mb-8 text-center border-b border-blue-200 pb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🏥</span>
                </div>

                <h2 className="mt-4 text-blue-950 text-xl font-bold">
                    Admin Panel
                </h2>

                <p className="text-gray-500 text-sm">
                    Hospital Management
                </p>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
                {menus.map((menu, index) => (
                    <Link
                        key={index}
                        to={menu.path}
                        className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300
${location.pathname === menu.path
                                ? 'bg-white text-blue-700'
                                : 'bg-blue-600 text-white hover:bg-blue-500'
                            }`}
                    >
                        <span>{menu.icon}</span>

                        <span className="font-medium text-sm md:text-base">
                            {menu.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Admin;