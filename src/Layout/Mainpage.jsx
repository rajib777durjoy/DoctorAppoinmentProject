import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Mainpage = () => {
    return (
        <div>
            {/* navbar */}
            <Navbar></Navbar>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Mainpage;