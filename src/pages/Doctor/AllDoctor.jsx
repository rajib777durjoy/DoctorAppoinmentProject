import React, { useEffect, useState } from 'react';
import { motion} from "motion/react";
import AxiosPublic from '../../Hook/AxosPublic';
import { Link } from 'react-router-dom';

const AllDoctor = () => {
    const axiospublic= AxiosPublic()
    const [doctors,setdoctor]=useState([]);
    useEffect(()=>{
     axiospublic.get('/doctor/alldoctor')
     .then(res=>{
        console.log(res.data)
       setdoctor(res.data);
     })
    },[])
    return (
        <div className='w-[100%] my-10 min-h-[500px]'>
            <div className='w-[50%] mx-auto my-10 py-5 '>
                <h1 className='text-4xl text-center font-bold'>Doctor Fetures</h1>
            </div>
            <div className='w-[90%] mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {
                    doctors?.map(item =><motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                     className="card hover:bg-slate-300 shadow-md shadow-amber-300 hover:shadow-md hover:shadow-gray-400">
                        <figure className="px-10 pt-10">
                            <img
                                src={item?.image}
                                alt=""
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            
                            <div className="card-actions">
                            <Link to={`/doctorDetails/${item?._id}`} ><button  className="btn bg-amber-300">Details</button></Link> 
                            </div>
                        </div>
                    </motion.div>)
                }

            </div>
        </div>
    );
};

export default AllDoctor;