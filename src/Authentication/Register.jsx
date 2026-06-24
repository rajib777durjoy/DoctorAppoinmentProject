import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AxiosPublic from '../Hook/AxosPublic';
import Swal from 'sweetalert2';
import useAuth from '../Hook/useAuth';
import axios from 'axios';
import axiosSecure from '../Hook/axiosSecure';

// const image_key = import.meta.env.VITE_ImgbbAPIKey;
// const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_key}`;

const Register = () => {
    const { userSignUp, ProfileUpdate, googleSign } = useAuth();
    const axiospublic = AxiosPublic();
    const AxiosSequre = axiosSecure();
    const navigateHome = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleGoogle = () => {
        googleSign()
            .then(res => {
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    image: res.user?.photoURL,
                    role: "member",
                };
                const formData = new FormData();
                formData.append("name", res.user?.displayName);
                formData.append("email", res.user?.email);
                formData.append("role", "member");
                formData.append("image", res.user?.photoURL);

                axiospublic.post(`/addUser/${res?.user?.email}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then(() => {
                        navigateHome('/');
                        Swal.fire({
                            icon: "success",
                            title: "Google login successful",
                            timer: 1500,
                            showConfirmButton: false,
                            position: "top-center",
                        });
                    });
            });
    };

    const onSubmit = async (data) => {
        console.log('register form data', data.image[0]);
        const imageFile = data.image[0];
        userSignUp(data.email, data.password)
            .then((res) => {
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("email", data.email);
                formData.append("role", "member");
                formData.append("image", imageFile);
                if (res?.user) {
                    AxiosSequre.post(`/addUser/${data.email}`,formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                        .then((res) => { // insert user data // 
                            console.log(res)
                            if (res.data?.insertedId) {
                                ProfileUpdate(res.data?.name, res.data?.profile).then(() => {
                                    navigateHome('/');
                                    Swal.fire({
                                        icon: "success",
                                        title: "Registration successful",
                                        timer: 1500,
                                        showConfirmButton: false,
                                        position: "top-center",
                                    });
                                })
                            }
                        });
                }

            });

    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-blue-50">
            <div className="w-[90%] sm:w-[70%] md:w-[40%] bg-white shadow-xl rounded-2xl p-8 border border-blue-100">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Create Account
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="w-full mt-1 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="w-full mt-1 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Photo</label>
                        <input
                            type="file"
                            {...register("image", { required: true })}
                            className="w-full mt-1 p-2 border border-blue-200 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            className="w-full mt-1 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">Password is required</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Register
                    </button>
                </form>

                <button
                    onClick={handleGoogle}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-lg font-medium transition"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 font-semibold ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;