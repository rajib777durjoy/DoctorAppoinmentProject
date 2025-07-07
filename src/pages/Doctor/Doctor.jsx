import React from 'react';
import { Link } from 'react-router-dom';

const Doctor = () => {
    return (
        <div className='w-[100%] py-4'>
            <Link to='/dashboard/doctorHome'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Home</li>
            </Link>
            <Link to='addCategory'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Add Category</li>
            </Link>
            {/* <Link to='myappoinment'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>My Appoinment</li>
            </Link> */}
            <Link to='DoctorBalance'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>My Earnings</li>
            </Link>
            <Link to='listofPasent'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>My Patients</li>
            </Link>
            <Link to='newspost'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Post News</li>
            </Link>
            <Link to='/'>
                <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Go to Website</li>
            </Link>
        </div>

    );
};

export default Doctor;