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
    const {user} = useAuth();
    const navigateHome= useNavigate()
    console.log('users:',user?.email)
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
      
        if(!user?.email){
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
        <div className="max-w-3xl mx-auto p-6 bg-white text-gray-800 rounded-lg shadow-lg mt-10 border border-yellow-400">
            <h2 className="text-3xl font-bold mb-6 text-yellow-600 text-center">📝 Create New Post</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                    <label className="block mb-1 font-semibold text-yellow-700">Title</label>
                    <input
                        type="text"
                        name="title"

                        className="w-full p-3 rounded border border-yellow-300 focus:outline-yellow-500"
                        placeholder="Enter post title"
                        required
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block mb-1 font-semibold text-yellow-700">Tags (comma-separated)</label>
                    <input
                        type="text"
                        name="tags"
                        className="w-full p-3 rounded border border-yellow-300 focus:outline-yellow-500"
                        placeholder="e.g. react, tailwind"
                    />
                </div>

                {/* Image upload */}
                <div>
                    <label className="block mb-1 font-semibold text-yellow-700">Cover Image URL</label>
                    {/* <input type="file" name='image' onChange={handleImageChange}  /> */}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="file-input w-full  rounded border border-yellow-300 focus:outline-yellow-500" />

                </div>
                <img className='rounded-md' src={Image} alt="" width={50} height={50} />
                {/* Content */}
                <div>
                    <label className="block mb-1 font-semibold text-yellow-700">Post Content</label>
                    <textarea
                        name="content"
                        rows="8"

                        className="w-full p-3 rounded border border-yellow-300 focus:outline-yellow-500"
                        placeholder="Write your post content here..."
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition w-full font-semibold"
                >
                    🚀 Publish Post
                </button>
            </form>
        </div>
    );
};

export default NewsPost;