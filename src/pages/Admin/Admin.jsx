import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div className='w-[100%] py-4'>
            <Link to='/dashboard'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Static Page</li></Link>
            <Link to='newspost'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>News Post</li></Link>
            <Link to='applidlist'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Applied list</li></Link>
            <Link to='addcategory'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Add Category</li></Link>
            <Link to='paymentList'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>Payment list</li></Link>
            <Link to='newspost'><li className=' my-2 px-3 hover:bg-slate-400 py-1 list-none'>PostNews</li></Link>
        </div>
    );
};

export default Admin;