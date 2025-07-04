import React from 'react';
import Banner from './Banner/Banner';
import { Helmet } from 'react-helmet-async';
import About from './About';
import Category from './Category';
import Blog from './Blog';
import Doctors from '../Doctor/Doctors';
import AddDoctor from '../Doctor/AddDoctor';

const Home = () => {
    return (
        <div className='w-[100%] mx-auto min-h-screen overflow-x-hidden'>
            <Helmet>
                <title>Dr.Meet|Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <Doctors></Doctors>
            <About></About>
            <Blog></Blog>
            {/* <AddDoctor></AddDoctor> */}
        </div>
    );
};

export default Home;