
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axiosSecure from '../../Hook/axiosSecure';
import useAuth from '../../Hook/useAuth';
import { Link } from 'react-router-dom';

const Blog = () => {
  const AxiosSequre = axiosSecure();
  const { user } = useAuth();

  const { data: newsData = [] } = useQuery({
    queryKey: ['post', user?.email],
    queryFn: async () => {
      const res = await AxiosSequre.get(`/post_preview/${user?.email}`);
      return res.data;
    }
  });

  return (
    <section className="w-full py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-amber-500 mb-10">
          Health & Wellness Blogs
        </h1>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white border border-yellow-200 rounded-xl shadow hover:shadow-lg transition-all duration-300"
            >
              {/* User Header */}
              <div className="flex items-center gap-3 p-4">
                <img
                  src={item?.user_profile || "/default-avatar.png"}
                  alt={item?.name}
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item?.name}{' '}
                    <span className="text-amber-500 text-xs capitalize">
                      ({item?.role})
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(item?.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Blog Image */}
              <div className="w-full h-52 overflow-hidden rounded-lg">
                <img
                  src={item?.Image || "/default-blog.jpg"}
                  alt="Post Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Blog Content */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                  {item?.title}
                </h2>
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                  {item?.content?.slice(0, 180)}...
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-sm mb-4">
                  {item?.tags?.split(',')?.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-amber-100 text-amber-600 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center border-t pt-3 text-sm text-gray-600">
                  <button className="hover:text-amber-500">👍 Like</button>
                  <button className="hover:text-amber-500">💬 Comment</button>
                  <Link to={`/blog/${item?._id}`} className="hover:text-amber-500 font-medium">
                    Read more →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
  
};

export default Blog;

