import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosSecure from '../../Hook/axiosSecure';

const Postnews = () => {
 const AxiosSequre= axiosSecure()
  const {data:newsData=[],refetch}= useQuery({
    queryKey:[],
    queryFn:async()=>{
      const res = await AxiosSequre.post(`/newspost`)
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