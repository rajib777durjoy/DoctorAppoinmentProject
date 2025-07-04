import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/doctor_2785482.png';
import useAuth from '../Hook/useAuth';
import axiosSecure from '../Hook/axiosSecure';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const { signout, user } = useAuth();
  const navigate = useNavigate();
  const AxiosSecure = axiosSecure();

  const { data: userVerify = [], isPending } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await AxiosSecure(`/userverify/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only fetch if user email exists
  });

  const admin = userVerify?.user === 'admin';
  const doctor = userVerify?.user === 'doctor';
  const member = userVerify?.user === 'member';

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `mx-3 px-3 py-2 rounded-lg text-lg font-semibold transition-colors ${
            isActive
              ? 'text-amber-900 bg-amber-200 shadow-lg'
              : 'text-gray-800 hover:text-amber-700 hover:bg-amber-100'
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/alldoctor"
        className={({ isActive }) =>
          `mx-3 px-3 py-2 rounded-lg text-lg font-semibold transition-colors ${
            isActive
              ? 'text-amber-900 bg-amber-200 shadow-lg'
              : 'text-gray-800 hover:text-amber-700 hover:bg-amber-100'
          }`
        }
      >
        Our Doctors
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `mx-3 px-3 py-2 rounded-lg text-lg font-semibold transition-colors ${
            isActive
              ? 'text-amber-900 bg-amber-200 shadow-lg'
              : 'text-gray-800 hover:text-amber-700 hover:bg-amber-100'
          }`
        }
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `mx-3 px-3 py-2 rounded-lg text-lg font-semibold transition-colors ${
            isActive
              ? 'text-amber-900 bg-amber-200 shadow-lg'
              : 'text-gray-800 hover:text-amber-700 hover:bg-amber-100'
          }`
        }
      >
        Contact
      </NavLink>
    </>
  );

  const protectedLinks = (
    <>
      {admin && (
        <NavLink
          to="/dashboard/adminHome"
          className="block px-4 py-2 rounded-md hover:bg-amber-200 hover:text-amber-900 font-medium transition"
        >
           Dashboard
        </NavLink>
      )}
      {doctor && (
        <NavLink
          to="/dashboard/doctorHome"
          className="block px-4 py-2 rounded-md hover:bg-amber-200 hover:text-amber-900 font-medium transition"
        >
         Dashboard
        </NavLink>
      )}
      {member && (
        <NavLink
          to="/dashboard/memberHome"
          className="block px-4 py-2 rounded-md hover:bg-amber-200 hover:text-amber-900 font-medium transition"
        >
         Dashboard
        </NavLink>
      )}
      <NavLink
        to="/profile_page"
        className="block px-4 py-2 rounded-md hover:bg-amber-200 hover:text-amber-900 font-medium transition"
      >
        Profile
      </NavLink>
    </>
  );

  return (
    <header className="bg-amber-400 sticky top-0 z-50 shadow-xl">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">
        {/* Logo and Title */}
        <Link
          to="/"
          className="flex items-center gap-3 font-extrabold text-white text-3xl select-none drop-shadow-lg"
          aria-label="Dr Meet Home"
        >
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <span>
            Dr<span className="text-gray-900 text-2xl font-semibold">.Meet</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-6">{links}</div>

        {/* User Section */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              {/* Profile Dropdown */}
              <div className="relative group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-label="User menu"
                  className="flex items-center focus:outline-none ring-2  rounded-full"
                >
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-4 border-white shadow-md"
                  />
                </button>
                <div
                  className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-2xl py-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-30"
                  role="menu"
                  aria-orientation="vertical"
                  aria-label="User dropdown menu"
                >
                  {protectedLinks}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  signout().then(() => navigate('/login'));
                }}
                className="px-5 py-2 bg-white hover:bg-yellow-400 text-black hover:text-white rounded-lg shadow-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-white text-amber-700 font-semibold rounded-lg shadow-lg hover:bg-amber-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-amber-800 text-white font-semibold rounded-lg shadow-lg hover:bg-amber-900 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden relative">
          <input type="checkbox" id="menu-toggle" className="hidden peer" />
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer flex items-center px-4 py-3 border rounded-md text-white border-white peer-checked:bg-amber-500 transition"
            aria-label="Toggle menu"
          >
            <svg
              className="fill-current h-7 w-7"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h8m-8 6h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>

          <div
            className="absolute top-full left-0 w-full bg-amber-400 shadow-lg rounded-b-lg py-3 opacity-0 pointer-events-none transition-opacity duration-300 peer-checked:opacity-100 peer-checked:pointer-events-auto"
            id="menu"
          >
            <div className="flex flex-col items-center space-y-2">
              {links}
              {user && protectedLinks}
              {user ? (
                <button
                  onClick={() => {
                    signout().then(() => navigate('/login'));
                  }}
                  className="mt-3 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg w-11/12 font-semibold"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mt-3 px-6 py-2 bg-white text-amber-700 font-semibold rounded-lg shadow-lg w-11/12 text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="mt-3 px-6 py-2 bg-amber-800 text-white font-semibold rounded-lg shadow-lg w-11/12 text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;


