import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaWallet, FaUsers, FaNewspaper, FaGlobe } from "react-icons/fa";

const Doctor = () => {
  return (
    <aside className="w-64 rounded-md min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-5">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-wide">
          Doctor Panel
        </h2>
        <p className="text-blue-200 text-sm mt-1">
          Manage your clinic activity
        </p>
      </div>

      {/* MENU */}
      <nav className="space-y-2 text-sm">

        <NavLink
          to="/dashboard/doctorHome"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-600" : "hover:bg-blue-700"
            }`
          }
        >
          <FaHome /> Home
        </NavLink>

        <NavLink
          to="addCategory"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-600" : "hover:bg-blue-700"
            }`
          }
        >
          <FaPlus /> Add Category
        </NavLink>

        <NavLink
          to="DoctorBalance"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-600" : "hover:bg-blue-700"
            }`
          }
        >
          <FaWallet /> My Earnings
        </NavLink>

        <NavLink
          to="listofPasent"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-600" : "hover:bg-blue-700"
            }`
          }
        >
          <FaUsers /> My Patients
        </NavLink>

        <NavLink
          to="newspost"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-600" : "hover:bg-blue-700"
            }`
          }
        >
          <FaNewspaper /> Post News
        </NavLink>

        <div className="border-t border-blue-700 my-4"></div>

        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaGlobe /> Go to Website
        </Link>

      </nav>

    </aside>
  );
};

export default Doctor;