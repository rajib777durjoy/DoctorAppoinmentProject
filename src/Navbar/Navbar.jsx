import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/doctor_2785482.png'
import useAuth from '../Hook/useAuth';

const Navbar = () => {
    const { signout, user } = useAuth()
    const navigateLogin = useNavigate()
    const links = <>
        <NavLink to='/' className='mx-2 text-lg text-gray-500'>Home</NavLink>
        <NavLink to='/alldoctor' className='mx-2 text-lg text-gray-500'>AllDoctor</NavLink>
        <NavLink to='/about' className='mx-2 text-lg text-gray-500'>About</NavLink>
        <NavLink to='/contact' className='mx-2 text-lg text-gray-500'>Contact</NavLink>
        
    </>
    const protect=<>
    <NavLink className='my-1 hover:bg-amber-100 px-2 py-1' to='/dashboard'>Dashboard</NavLink>
    <NavLink className='my-1 hover:bg-amber-100 px-2 py-1' to='/profile'>Profile</NavLink>
    </>
    console.log('user', user?.email)
    return (
        <div className='w-[100%] bg-amber-300 sticky top-0 z-50'>
            <div className="navbar p-0 bg-transparent w-[90%] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <div className='flex items-center'>
                        <img src={logo} className='w-[30px] h-[30px] mx-1 pb-1' alt="" />
                        <a className="text-white font-extrabold text-2xl">Dr<span className='text-xl text-gray-500'>.Meet </span></a>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <div className='flex items-center '>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className=" m-1"><div className='w-[40px] h-[40px] rounded-full '>
                                <img src={user?.photoURL} alt="" className='w-[100%] h-[100%] rounded-full' />
                            </div></div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 mt-2 rounded-box z-1 w-[100px] p-2 shadow-sm">
                                    {protect}
                                </ul>
                            </div>
                            <button className='btn ms-2' onClick={() => {
                                signout().then(() => {
                                    navigateLogin('/login')
                                })
                            }}>Logout</button>

                        </div> : <div className='flex items-center gap-2'>
                            <Link to='/login'><button className='btn'>Login</button></Link>
                            <Link to='/register'><button className='btn'>Register</button></Link>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;