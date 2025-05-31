
import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';

const PasentList = () => {
    const AxiosSequre= axiosSecure();
    const {user}=useAuth();
    const [pasentList,setpasentlist]=useState([]);
    useEffect(()=>{
        AxiosSequre.get(`/listfopasent/${user?.email}`)
        .then(res=>{
            console.log(res.data)
            setpasentlist(res.data);

        })
    },[]) 
    return (
       <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Pasent_Name</th>
        <th>Pasent_Email</th>
        <th>Appoinment_day</th>
        <th>Payment_Id</th>
      </tr>
    </thead>
    {
        pasentList.map((item,index)=><tbody>
      {/* row 1 */}
      <tr>
        <th>{index+1}</th>
        <td>{item?.pasentList?.appliedName}</td>
        <td>{item?.pasentList?.appliedEmail}</td>
        <td>{item?.pasentList?.appointmentDay}</td>
        <td>{item?.pasentList?.paymentIntentId}</td>
      </tr>
     
    </tbody>)
    }
    
  </table>
</div>
    );
};

export default PasentList;