import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from "motion/react";
import { FaLongArrowAltRight } from "react-icons/fa";

const About = () => {
    return (
        <div className='w-[100%] min-h-[600px] my-20 '>
            <Helmet>
                <title>Dr.Meet|About</title>
            </Helmet>
            <div className='w-[90%] h-[600px]  mx-auto  grid grid-cols-2 gap-4'>
                {/* image section */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: .9, delay: .5 }}
                    className='h-[90%] my-auto rounded-md '>
                    <img src="/doctor-nurses-special-equipment.jpg" alt="" className='h-[100%] rounded-md' />
                </motion.div>
                <motion.div

                    initial={{ opacity: 0, x:100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: .9, delay: .5 }}
                    className='ps-6 pt-10'>
                    <h1 className='text-5xl font-extrabold text-start mt-20 '>About Us</h1>
                    <h2 className='text-lg mt-2 font-medium '>Expert Treatment-Your Health, Our Priority!</h2>
                    <p className='mt-10'>At Dr.Meet, we are committed to providing top-quality healthcare with a patient-first approach. Our expert team of doctors and medical professionals offers a wide range of treatments tailored to meet your specific health needs. Whether you need routine check-ups, specialized care, or advanced medical procedures, we ensure that you receive the best possible treatment in a comfortable and caring environment.</p>
                    <div className='mt-6'>
                        <motion.button
                            initial={{ scale: 0.9 }}
                            whileHover={{ scale: 1, width: '160px' }}
                            className='btn bg-amber-300 flex items-center gap-2'>Read More <FaLongArrowAltRight /></motion.button>
                    </div>
                </motion.div>
            </div>

        </div>
    );
};

export default About;