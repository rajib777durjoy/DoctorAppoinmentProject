import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '../AuthProvider';
import { useForm } from 'react-hook-form';
import AxiosPublic from '../Hook/AxosPublic';
import Swal from 'sweetalert2';
import useAuth from '../Hook/useAuth';


const image_key = import.meta.env.VITE_ImgbbAPIKey;
const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_key}`
const Register = () => {
    const { userSignUp, ProfileUpdate, googleSign } = useAuth()
    const axiospublic = AxiosPublic()
    const navigateHome = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleGoogle = () => {

        googleSign()
            .then(res => {
                console.log('respons', res.user)
            })
            .catch(erro => {
                console.log('error', erro)
            })
    }
    const onSubmit = async (data) => {
        //  console.log(data.image[0])
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const imagefile = {
            image: data.image[0]
        }

        const res = await axiospublic.post(image_hosting_API, imagefile, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        // console.log('response',res.data?.data?.display_url)
        // console.log('response',res.data?.success)
        const photoURL = res.data?.data?.display_url;
        if (res.data?.success) {

            userSignUp(email, password)
                .then(res => {
                    // console.log('res',res.user)
                    if (res.user && photoURL) {
                        console.log('register', photoURL)
                        const userDetails = {
                            name,
                            email,
                            photoURL,
                            password,
                            role:'member'

                        }
                        ProfileUpdate(name, photoURL)
                        axiospublic.post(`/addUser`, userDetails)
                            .then(response => {
                                console.log("response", response.data)
                                if (response.data?.insertedId) {
                                    Swal.fire({
                                        position: "top-center",
                                        icon: "success",
                                        title: "Registation Done",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigateHome('/')
                                }
                            })
                    }
                })
        }

    }
    return (
        <div className='w-[100%] '>
            <div className='w-[40%] rounded-lg shadow-lg mx-auto lg:mt-10 bg-base-300 lg:px-10 lg:py-5'>
                <h1 className='text-2xl text-black font-extrabold text-center py-5'>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="fieldset-label">Name</label>
                        <input type="text" name='fullname' {...register("name")} className="input w-[100%] rounded-md" placeholder="Name" />
                        <label className="fieldset-label">Email</label>
                        <input type="email" name='email' {...register("email")} className="input w-[100%] rounded-md" placeholder="Email" />
                        <label className="fieldset-label">Select Photo</label>
                        <input type="file" name='photo' {...register("image")} className="input w-[100%] rounded-md" placeholder="Photo" />
                        <label className="fieldset-label">Password</label>
                        <input type="password" name='password' {...register("password")} className="input w-[100%] rounded-md" placeholder="Password" />
                        {errors.password && <span>This field is required</span>}
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button type='submit' className="btn bg-amber-300 mt-4 rounded-lg">Register</button>
                    </fieldset>
                </form>
                <button onClick={handleGoogle} className='btn w-[100%] rounded-lg bg-amber-300 my-4'><FcGoogle className='text-xl' />Google</button>
                <div className=' text-center w-[100%] '>Already have an Account <Link to='/login' className='text-blue-700 font-bold'>Login</Link></div>
            </div>
        </div>
    );
};

export default Register;