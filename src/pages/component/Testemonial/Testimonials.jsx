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
    comment: 'Friendly staff and professional doctors. I felt very comfortable throughout my visit.',
  },
  {
    id: 3,
    name: 'Nadia Islam',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
    comment: 'Excellent service and quick response. The dashboard for appointments is very helpful.',
  },
];

const StarRating = ({ count }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-5 h-5 inline ${
          i <= count ? 'text-amber-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.962c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.962a1 1 0 00-.364-1.118L2.037 9.39c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.962z" />
      </svg>
    );
  }
  return <div>{stars}</div>;
};

const Testimonials = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-amber-800 mb-10 text-center">What Our Patients Say</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonialsData.map(({ id, name, image, rating, comment }) => (
          <div
            key={id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={image}
              alt={name}
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <StarRating count={rating} />
            <p className="mt-3 text-gray-700 italic">"{comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
