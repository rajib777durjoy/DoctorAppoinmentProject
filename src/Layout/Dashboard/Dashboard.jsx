import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import axiosSecure from '../../Hook/axiosSecure';

import Admin from '../../pages/Admin/Admin';
import Mambers from '../../pages/Mamber/Component/Mambers';
import Doctor from '../../pages/Doctor/Doctor';

const Dashboard = () => {
  const { user } = useAuth();
  const AxiosSecure = axiosSecure();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    AxiosSecure.get(`/verify_user/${user?.email}`)
      .then(res => {
        setRole(res.data?.role);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email]);

  const isAdmin = role === 'admin';
  const isDoctor = role === 'doctor';
  const isMember = role === 'member';

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-yellow-600 text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* TOP BAR */}
      <header className="h-[70px] bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-50">

        <button
          onClick={() => setOpen(true)}
          className="md:hidden bg-yellow-500 text-white px-3 py-1 rounded-lg"
        >
          ☰
        </button>

        <h1 className="text-lg font-bold text-blue-600 capitalize">
          🩺 {role} Dashboard
        </h1>

        <div className="text-sm text-gray-600 hidden md:block">
          Welcome, {user?.displayName || user?.email}
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1">

        {/* OVERLAY */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            fixed md:static z-50  top-0 left-0 h-full
            w-[260px] bg-white  shadow-lg
            transform transition-transform duration-300
            ${open ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}
        >

          {/* close button mobile */}
          <div className="md:hidden p-4 border-b">
            <button
              onClick={() => setOpen(false)}
              className="text-red-500 font-bold"
            >
              ✕ Close
            </button>
          </div>

          <nav className="p-4 space-y-2">

            {isMember && <Mambers />}
            {isAdmin && <Admin />}
            {isDoctor && <Doctor />}

          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 md:ml-0 p-6">

          <div className="bg-white rounded-2xl shadow-sm  p-6 min-h-screen">
            <Outlet />
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
