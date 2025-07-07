import React from 'react';
import Banner from './Banner/Banner';
import { Helmet } from 'react-helmet-async';
import About from './About';
import Category from './Category';
import Blog from './Blog';
import Doctors from '../Doctor/Doctors';
import AddDoctor from '../Doctor/AddDoctor';
import Service from './service/Service';
import Contact from './Contact/Contact';
import Testimonials from './Testemonial/Testimonials';

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
            <Service></Service>
            <Blog></Blog>
            <Testimonials></Testimonials>
            <Contact></Contact>
        </div>
    );
};

export default Home;