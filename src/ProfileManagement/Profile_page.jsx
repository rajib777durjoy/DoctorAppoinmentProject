import React, { useState } from 'react';
import useAuth from '../Hook/useAuth';
import { auth } from '../firebase.config';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';
import axiosSecure from '../Hook/axiosSecure';
import Swal from 'sweetalert2';

const Profile_page = () => {
  const cloudName = 'dwmkakht7';
  const { user } = useAuth();
  const AxiosSecure = axiosSecure();

  const [imagePreview, setImagePreview] = useState(user?.photoURL);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Upload image to cloudinary
  const handleChange = async (e) => {
    const imageFile = e.target.files[0];

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'DoctorMeer');

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    setImageUrl(res.data.secure_url);
    setImagePreview(res.data.secure_url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const bio = e.target.bio.value;

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imageUrl || user?.photoURL,
    })
      .then(() => {
        const updatedUser = {
          name,
          phone,
          bio,
          photoURL: imageUrl || user?.photoURL,
        };

        AxiosSecure.put(
          `/user_profile_update_to_DB/${user?.email}`,
          updatedUser
        ).then((res) => {
          if (res?.data) {
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Profile updated successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            setLoading(false);
          }
        });
      })
      .catch(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <p className="text-blue-600 font-semibold text-lg">
          Updating Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg border border-blue-100">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
          👤 Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center">
            <img
              src={imagePreview || user?.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-200 object-cover mb-3"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
          </div>

          {/* NAME */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              className="w-full p-3 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              className="w-full p-3 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter phone number"
            />
          </div>

          {/* BIO */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Short Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              className="w-full p-3 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write about yourself..."
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-md"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
};

export default Profile_page;