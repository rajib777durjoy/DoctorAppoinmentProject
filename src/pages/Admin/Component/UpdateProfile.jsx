import React from 'react';

const UpdateProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const bio = form.bio.value;

    const updatedProfile = {
      name,
      photoURL,
      bio,
    };

    console.log('Updated Info:', updatedProfile);
    // TODO: Send this to your backend
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-yellow-600 mb-8">📝 Update Your Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-500"
            required
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value="doctor@example.com" // replace with dynamic user.email
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed text-gray-500"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Profile Photo URL</label>
          <input
            type="text"
            name="photoURL"
            placeholder="https://your-photo-url.com"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-500"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Bio</label>
          <textarea
            name="bio"
            rows="4"
            placeholder="Tell us something about yourself..."
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-500"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
          >
            💾 Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
