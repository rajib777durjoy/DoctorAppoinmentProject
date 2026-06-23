import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/doctor_2785482.png";
import useAuth from "../Hook/useAuth";
import axiosSecure from "../Hook/axiosSecure";

const Navbar = () => {
  const { user, signout, loading } = useAuth();
  const navigate = useNavigate();
  const AxiosSecure = axiosSecure();
  const [role, setRole] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    AxiosSecure.get(`/verify_user/${user.email}`).then((res) => {
      if (res?.data?.role) {
        setRole(res?.data?.role);
        console.log(res?.data?.role)
      }
    });
  }, [user, loading]);

  const handleLogout = async () => {
    await signout();
    setRole(null)
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive
      ? "bg-blue-100 text-blue-600"
      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
    }`;
  //  console.log('role',role,loading)
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-2xl shadow-lg">
              <img
                src={logo}
                alt="logo"
                className="w-8 h-8 object-cover"
              />
            </div>

            <div>
              <h1 className="font-bold text-2xl text-gray-900">
                Dr<span className="text-blue-600">Meet</span>
              </h1>
              <p className="text-xs text-gray-500">
                Healthcare Platform
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">

            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/alldoctor" className={navClass}>
              Doctors
            </NavLink>

            <NavLink to="/service" className={navClass}>
              Services
            </NavLink>

            <NavLink to="/profile_page" className={navClass}>
              Profile
            </NavLink>

            {(user && role === "admin") && (
              <NavLink
                to="/dashboard/adminHome"
                className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md"
              >
                Dashboard
              </NavLink>
            )}

            {(user && role === "doctor") && (
              <NavLink
                to="/dashboard/doctorHome"
                className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md"
              >
                Dashboard
              </NavLink>
            )}

            {(user && role === "member") && (
              <NavLink
                to="/dashboard/memberHome"
                className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md"
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0}>
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="w-11 h-11 rounded-full border-2 border-blue-500 cursor-pointer"
                    />
                  </label>

                  <ul
                    tabIndex={0}
                    className="dropdown-content z-50 menu p-3 shadow-xl bg-white rounded-2xl w-72 mt-3"
                  >
                    <div className="flex items-center gap-3 p-2">
                      <img
                        src={user?.photoURL}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />

                      <div>
                        <h3 className="font-semibold">
                          {user?.displayName}
                        </h3>

                        <p className="text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="divider my-1"></div>

                    <li>
                      <Link to="/profile_page">
                        My Profile
                      </Link>
                    </li>

                    <li>
                      <button onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col p-5 gap-3">

            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/alldoctor" className={navClass}>
              Doctors
            </NavLink>

            <NavLink to="/service" className={navClass}>
              Services
            </NavLink>

            <NavLink to="/profile_page" className={navClass}>
              Profile
            </NavLink>

            <hr />
            {(user && role === "admin") && (
              <NavLink
                to="/dashboard/adminHome"
                className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md"
              >
                Dashboard
              </NavLink>
            )}

            {(user && role === "doctor") && (
              <NavLink
                to="/dashboard/doctorHome"
                className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md"
              >
                Dashboard
              </NavLink>
            )}

            {(user && role === "member") && (
              <NavLink
                to="/dashboard/memberHome"
                className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md"
              >
                Dashboard
              </NavLink>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 rounded-xl"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border text-center py-2 rounded-xl"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-center text-white py-2 rounded-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;


