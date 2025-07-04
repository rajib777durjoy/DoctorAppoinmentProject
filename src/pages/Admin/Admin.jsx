import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div className='w-[100%] py-4'>
            <Link to='/dashboard/AdminHome'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Admin Dashboard</li>
            </Link>
            <Link to='newspost'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Create News Post</li>
            </Link>
            <Link to='applidlist'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Applicant List</li>
            </Link>
            <Link to='addcategory'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Manage Categories</li>
            </Link>
            <Link to='paymentList'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Payment Records</li>
            </Link>
        </div>

    );
};

export default Admin;