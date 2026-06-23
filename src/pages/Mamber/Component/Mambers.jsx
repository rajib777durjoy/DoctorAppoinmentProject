import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUserMd,
  FaMoneyBill,
  FaCalendarCheck,
  FaComments,
  FaArrowLeft
} from 'react-icons/fa';

const Mambers = () => {
  const location = useLocation();

  const menu = [
    { name: "Member Dashboard", path: "MemberHome", icon: <FaHome /> },
    { name: "Apply as Doctor", path: "doctorAdd", icon: <FaUserMd /> },
    { name: "Billing & Payments", path: "paymentShow", icon: <FaMoneyBill /> },
    { name: "My Appointments", path: "appoinmentlist", icon: <FaCalendarCheck /> },
    { name: "Messages", path: "chat", icon: <FaComments /> },
  ];

  return (
    <aside className="w-full py-4 px-3">

      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4">

        {/* MENU */}
        <nav className="space-y-2">

          {menu.map((item, i) => {
            const isActive = location.pathname.includes(item.path);

            return (
              <Link key={i} to={item.path}>
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}

          {/* BACK HOME */}
          <Link to="/">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 mt-4">
              <FaArrowLeft />
              <span className="text-sm font-medium">Back to Home</span>
            </div>
          </Link>

        </nav>

      </div>
    </aside>
  );
};

export default Mambers;