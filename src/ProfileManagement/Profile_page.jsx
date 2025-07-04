import React, { useState } from 'react';
import useAuth from '../Hook/useAuth';
import { auth } from '../firebase.config';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';
import AxiosPublic from '../Hook/AxosPublic';
import axiosSecure from '../Hook/axiosSecure';
import Swal from 'sweetalert2';


const Profile_page = () => {
    const cloudName = 'dwmkakht7';
    const { user } = useAuth();
    const [imagePreview, setImagePreview] = useState(user?.photoURL);;
    const [Image, setImageUrl] = useState('');
    const AxiosSecure = axiosSecure();
    const [loading,setLoading]=useState(false)


     if(loading){
        return <div className='text-center mt-20'>Profile Loading...</div>
     }

    const handleChange = async (e) => {
        const imageFile = e.target.files[0];
        console.log(imageFile)
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'DoctorMeer');
        console.log('formData', formData)
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // your cloud name here
            formData
        );

        setImageUrl(res.data.secure_url);
        console.log('image upload done:', res)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        // TODO: Add your API integration logic here
        // console.log('Updated profile:', formData);
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const bio = e.target.bio.value;
        console.log('user identy:::', name, phone, bio)

        updateProfile(auth.currentUser, {
            displayName: name, photoURL: Image
        }).then(() => {
            // Profile updated!
            console.log('successful profiel update:::')
            setImagePreview(Image)
            const updatedUser = {
                name,
                phone,
                bio,
                photoURL: Image,
            };
            AxiosSecure.put(`/user_profile_update_to_DB/${user?.email}`,updatedUser)
                .then(res => {
                    console.log('profile update successful', res.data)
                    if (res?.data) {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Update successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                       setImageUrl('')
                       setLoading(false)
                    }
                })
            // ...
        }).catch((error) => {
            // An error occurred
            setLoading(false)
            // ...
        });
    };
     
    console.log('verify user:::',user)
    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10 border border-yellow-400">
            <h2 className="text-3xl font-bold mb-6 text-yellow-600 text-center">👤 Update Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Photo */}
                <div className="flex flex-col items-center">
                    <img
                        src={user?.photoURL}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full border-4 border-yellow-400 object-cover mb-2"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleChange}
                        className="file-input file-input-bordered file-input-warning w-full max-w-xs"
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        // value={}
                        className="w-full p-3 rounded border border-yellow-300 focus:outline-yellow-500"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        // value={formData.phone}
                        className="w-full p-3 rounded border border-yellow-300 focus:outline-yellow-500"
                        placeholder="Enter your phone number"
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Short Bio</label>
                    <textarea
                        name="bio"
                        // value={formData.bio}
                        rows={4}
                        className="w-full p-3 rounded border border-yellow-300 focus:outline-yellow-500"
                        placeholder="Write something about yourself..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-semibold w-full transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile_page;