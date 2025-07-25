import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';

const Mainpage = () => {
    return (
        <div className='w-[100%]'>
            {/* navbar */}
            <Navbar></Navbar>
            <Outlet></Outlet>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Mainpage;