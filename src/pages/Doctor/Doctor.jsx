import React from 'react';
import { Link } from 'react-router-dom';

const Doctor = () => {
    return (
        <div className='w-[100%] py-4'>
            <Link to='/dashboard'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Static</li></Link>
            <Link to='addCategory'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Category +</li></Link>
            <Link to='DoctorBalance'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Balance</li></Link>
            <Link to='listofPasent'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>List Of Pasent</li></Link>
            <Link to='newspost'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>PostNews</li></Link>
            <Link to='/'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Home</li></Link>
        </div>
    );
};

export default Doctor;