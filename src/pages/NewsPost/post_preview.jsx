import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosSecure from '../../Hook/axiosSecure';
import useAuth from '../../Hook/useAuth';

const Postnews = () => {
 const AxiosSequre= axiosSecure();
 const {user}=useAuth()
  const {data:newsData=[],refetch}= useQuery({
    queryKey:[user?.email],
    queryFn:async()=>{
      const res = await AxiosSequre.get(`/post_preview/${user?.email}`)
      return res.data;
    }
  })
  console.log('newsData:',newsData)
    return (
        <div>
            
        </div>
    );
};

export default Postnews;