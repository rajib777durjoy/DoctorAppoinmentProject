import React from 'react';
import { Link } from 'react-router-dom';

const Mambers = () => {
    return (
        <div className='w-[100%] py-4'>
            <Link to='/dashboard'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Static</li></Link>
            <Link to='doctorAdd'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Become a Doctor</li></Link>
            <Link to='paymentShow'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Payment Details</li></Link>
            <Link to='appoinmentlist'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Appoinment list</li></Link>
            <Link to='/'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Home</li></Link>
        </div>
    );
};

export default Mambers;