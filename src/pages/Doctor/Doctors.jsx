import React, { useEffect, useState } from 'react';
import AxiosPublic from '../../Hook/AxosPublic';
import { motion} from "motion/react";
import { Link} from 'react-router-dom';


const Doctors = () => {
 const [doctor,setdoctor]=useState([])
  const axiospublic= AxiosPublic()
  useEffect(()=>{
    axiospublic.get('/doctorlist')
    .then(res=>{
        setdoctor(res.data)
    })
  },[])
 console.log('doctorlist:',doctor)
 
    return (
        <div className='w-[100%] my-10 min-h-[500px]'>
            <div className='w-[50%] mx-auto my-10 py-5 '>
                <h1 className='text-4xl text-center font-bold'>Doctor Fetures</h1>
            </div>
            <div className='w-[90%]  mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {
                    doctor?.map((item,index)=><motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                     key={index} className="card hover:bg-slate-300 h-[400px] shadow-md shadow-amber-300 hover:shadow-md hover:shadow-gray-400">
                        <figure className="px-10 h-[200px]">
                            <img
                                src={item?.image}
                                alt=""
                                className="rounded-full h-[100%] w-[90%] mx-auto object-fill  " />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{item?.name}</h2>
                            <p>{item?.description.slice(0,100)}</p>
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

export default Doctors;