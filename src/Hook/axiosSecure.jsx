import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


const instance = axios.create({
  baseURL:`https://doctorappoinmentserver.onrender.com`,
  withCredentials: true

})

const axiosSecure = () => {
  const { signout } = useAuth()
  const navigateLogin = useNavigate()

  instance.interceptors.response.use(function (response) {
    // console.log('response data',response)
    return response;
  }, async (error) => {
    //  console.log('error interceptor',error)
    if (error?.status == 401 || error?.status == 403) {
      await signout()
      navigateLogin('/login')

    }
    return Promise.reject(error);
  });


  return instance
};

export default axiosSecure;