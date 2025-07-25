import axios from 'axios';
import React from 'react';

const AxiosPublic = () => {
  const instance = axios.create({
    baseURL:`https://doctor-server-drab.vercel.app`,
    withCredentials: true
  });
  return instance;
};

export default AxiosPublic;