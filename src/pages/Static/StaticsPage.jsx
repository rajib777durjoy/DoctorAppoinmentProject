import React, { useEffect, useState } from 'react';
import axiosSecure from '../../Hook/axiosSecure';
import useAuth from '../../Hook/useAuth';

const StaticsPage = () => {
    const AxiosSecqure= axiosSecure();
    const [data,setData]=useState([]);
    const [totalDoctor,setTotalDoctor]= useState(0)
    const {user}=useAuth()
    useEffect(()=>{
    AxiosSecqure.get(`/totalPayment/totalDoctor/${user?.email}`)
    .then(res=>{
        console.log('json daata',res.data[1]);
        setData(res.data[0])
        setTotalDoctor(res.data[1])
    })   
    },[])
    console.log(data?.totalPayment,totalDoctor)
    return (
        <div>
            <h1>{totalDoctor}</h1>
            <h2>{data}</h2>
        </div>
    );
};

export default StaticsPage;