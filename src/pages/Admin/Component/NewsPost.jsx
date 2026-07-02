import React, { useState } from 'react';
import axios from 'axios';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const NewsPost = () => {
    const [Image, setImageUrl] = useState('');
    const AxiosSequre = axiosSecure();

    const cloudName = 'dwmkakht7';
    const { user } = useAuth();
    const navigateHome = useNavigate()
    console.log('users:', user?.email)
    const handleImageChange = async (e) => {
        const imageFile = e.target.files[0];
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'DoctorMeer');
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // your cloud name here
            formData
        );

        setImageUrl(res.data.secure_url);
        console.log('image upload done:', res)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const tags = e.target.tags.value;
        const content = e.target.content.value;
        const datas = {
            title,
            tags,
            Image,
            content,
        }

        if (!user?.email) {
            return <div className='text-center text-rose-500'>user is not show</div>
        }
        const res = await AxiosSequre.post(`/newspost/${user?.email}`, datas)
        console.log('post_data:', res.data?.insertedId);
        if (res.data?.insertedId) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "post successful",
                showConfirmButton: false,
                timer: 1500
            });
            setImageUrl('')
            navigateHome('/dashboard/doctorHome')
        }
    }

    // console.log('Image::', Image.name)
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 py-10 px-4">

            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-cyan-100">

                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-8 py-10 text-white">

                    <h2 className="text-4xl font-bold">
                        📝 Create Health News
                    </h2>

                    <p className="mt-3 text-cyan-100 text-lg">
                        Share medical news, awareness articles and healthcare updates.
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8"
                >

                    {/* Title */}
                    <div className="lg:col-span-2">

                        <label className="block mb-2 font-semibold text-gray-700">
                            News Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter News Title"
                            required
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />

                    </div>

                    {/* Tags */}
                    <div>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Tags
                        </label>

                        <input
                            type="text"
                            name="tags"
                            placeholder="health, covid, medicine"
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />

                    </div>

                    {/* Upload */}
                    <div>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Upload Cover Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input file-input-bordered w-full"
                        />

                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-2">

                        <label className="block mb-3 font-semibold text-gray-700">
                            Image Preview
                        </label>

                        <div className="flex justify-center">

                            {
                                Image ?

                                    <img
                                        src={Image}
                                        alt=""
                                        className="w-full md:w-[450px] h-[260px] object-cover rounded-2xl shadow-lg border"
                                    />

                                    :

                                    <div className="w-full md:w-[450px] h-[260px] border-2 border-dashed rounded-2xl flex items-center justify-center text-gray-400">
                                        Image Preview
                                    </div>

                            }

                        </div>

                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2">

                        <label className="block mb-2 font-semibold text-gray-700">
                            News Content
                        </label>

                        <textarea
                            name="content"
                            rows="10"
                            placeholder="Write your article here..."
                            required
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        ></textarea>

                    </div>

                    {/* Bottom Card */}
                    <div className="lg:col-span-2 bg-cyan-50 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-5">

                        <div>

                            <h3 className="font-bold text-xl text-gray-700">
                                Ready to Publish?
                            </h3>

                            <p className="text-gray-500">
                                Double check your title, image and content before publishing.
                            </p>

                        </div>

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-bold shadow-lg transition duration-300 hover:scale-105"
                        >
                            🚀 Publish News
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default NewsPost;