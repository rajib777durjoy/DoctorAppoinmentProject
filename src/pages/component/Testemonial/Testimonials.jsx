import React from 'react';

const testimonialsData = [
  {
    id: 1,
    name: 'Sarah Khan',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    comment: 'Dr. Meet made my appointment process so smooth and easy. Highly recommend!',
  },
  {
    id: 2,
    name: 'Rafiq Ahmed',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4,
    comment: 'Professional doctors and smooth experience. I felt very comfortable throughout my visit.',
  },
  {
    id: 3,
    name: 'Nadia Islam',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
    comment: 'Excellent service and fast response. The dashboard is very helpful for appointments.',
  },
];

const StarRating = ({ count }) => {
  return (
    <div className="flex justify-center gap-1 mt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < count ? 'text-blue-500' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.962c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.962a1 1 0 00-.364-1.118L2.037 9.39c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.962z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800">
          What Our Patients Say
        </h2>
        <p className="text-gray-500 mt-2">
          Real feedback from patients who trusted our medical services
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">

        {testimonialsData.map(({ id, name, image, rating, comment }) => (
          <div
            key={id}
            className="bg-white border border-blue-100 shadow-sm hover:shadow-xl transition rounded-2xl p-6 text-center hover:-translate-y-1 duration-300"
          >

            {/* IMAGE */}
            <div className="flex justify-center">
              <img
                src={image}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
              />
            </div>

            {/* NAME */}
            <h3 className="text-lg font-bold text-gray-800 mt-4">
              {name}
            </h3>

            {/* RATING */}
            <StarRating count={rating} />

            {/* COMMENT */}
            <p className="text-gray-500 italic mt-4 text-sm leading-relaxed">
              “{comment}”
            </p>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Testimonials;
