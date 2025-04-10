import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AxiosPublic from '../Hook/AxosPublic';
import useAuth from '../Hook/useAuth';

const Login = () => {
    const axiospublic = AxiosPublic()
    const navigateHome = useNavigate()
    const {userSignIn}=useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log("data", data)
        const email = data.email;
        const password = data.password;
        if(email && password){
            userSignIn(email,password)
            .then(res=>{
                console.log(res.user)
                navigateHome('/')
            })
        }
        
        
    }
    return (
        <div className="w-[100%] py-10">
            <div className='w-[40%] rounded-lg shadow-lg mx-auto lg:mt-10 bg-base-300 lg:px-10 lg:py-5'>
                <h1 className='text-2xl text-black font-extrabold text-center py-5'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="fieldset-label">Email</label>
                        <input type="email" name='email' {...register("email")} className="input w-[100%] rounded-md" placeholder="Email" />
                        <label className="fieldset-label">Password</label>
                        <input type="password" name='password' {...register("password")} className="input w-[100%] rounded-md" placeholder="Password" />
                        {errors.password && <span>This field is required</span>}
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button type='submit' className="btn bg-amber-300 mt-4 rounded-lg">Login</button>
                    </fieldset>
                </form>
                <div className=' text-center w-[100%] '>Already have an Account <Link to='/register' className='text-blue-700 font-bold'>Register</Link></div>
            </div>
        </div>
    );
};

export default Login;