import React from 'react';
import { Link } from 'react-router-dom';

const Mambers = () => {
    return (
        <div className='w-[100%] py-4'>
  <Link to='MemberHome'>
    <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Member Dashboard</li>
  </Link>
  <Link to='doctorAdd'>
    <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Apply as Doctor</li>
  </Link>
  <Link to='paymentShow'>
    <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Billing & Payments</li>
  </Link>
  <Link to='appoinmentlist'>
    <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>My Appointments</li>
  </Link>
  <Link to='AI_Powered_Health'>
    <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>AI-Powered Health Checkup</li>
  </Link>
  <Link to='/'>
    <li className='my-2 px-3 hover:bg-slate-400 py-1 list-none'>Back to Home</li>
  </Link>
</div>

    );
};

export default Mambers;