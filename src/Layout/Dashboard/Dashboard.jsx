import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import axiosSecure from '../../Hook/axiosSecure';
import Admin from '../../pages/Admin/Admin';
import Mambers from '../../pages/Mamber/Component/Mambers';
import Doctor from '../../pages/Doctor/Doctor';

const Dashboard = () => {
  const { user } = useAuth();
  const AxiosSecure = axiosSecure();
  const [role, setRole] = useState()
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    setLoading(true)
    if (!user?.email) {
      setLoading(true)
      return;
    }
    AxiosSecure.get(`/verify_user/${user?.email}`)
      .then(res => {
        if (res.data?.role) {
          setRole(res.data.role)
          setLoading(false)
        }

      })
      .catch(err => {
        console.log('error', err)
        setLoading(false)
      })
  }, [user?.email])
  const admin = role == 'admin';
  const doctor = role == 'doctor';
  const member = role == 'member';
  console.log('role:', role)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-yellow-600">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 h-[70px] flex items-center justify-between px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-yellow-600 capitalize">
          🩺{role} Dashboard
        </h1>
        <div className="text-gray-600 font-medium">
          Welcome, {user?.displayName || user?.email}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-[240px] bg-white border-r border-gray-200 p-4 shadow-md fixed top-[70px] bottom-0 z-40 overflow-y-auto">
          <nav className="space-y-6">
            {member && <Mambers />}
            {admin && <Admin />}
            {doctor && <Doctor />}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-[240px] flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
