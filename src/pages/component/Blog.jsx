
import { motion } from "motion/react";
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosSecure from '../../Hook/axiosSecure';
import useAuth from '../../Hook/useAuth';

const Blog = () => {
  const AxiosSequre = axiosSecure();
  const { user } = useAuth()
  const { data: newsData = [], refetch } = useQuery({
    queryKey: ['post', user?.email],
    queryFn: async () => {
      const res = await AxiosSequre.get(`/post_preview/${user?.email}`)
      return res.data;
    }
  })
  console.log('newsData:', newsData)
  return (
    <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsData?.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
        >
          {/* User Info Header */}
          <div className="flex items-center gap-3 p-4">
            <img
              src={item?.user_profile}
              alt={item?.name}
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-800">{item?.name} <span className="text-green-600 capitalize">{item?.role}</span></h3>
              <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Post Image */}
          <div className="w-full h-[220px] overflow-hidden">
            <img
              src={item?.Image}
              alt="Post Cover"
              className="w-full h-full object-fill"
            />
          </div>

          {/* Post Content */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{item?.title}</h2>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {item?.content?.slice(0, 180)}...
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-sm mb-4">
              {item?.tags?.split(',')?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>

            {/* Interaction Buttons (Optional) */}
            <div className="flex justify-between border-t pt-3 text-sm text-gray-600">
              <button className="hover:text-blue-500">👍 Like</button>
              <button className="hover:text-blue-500">💬 Comment</button>
              <button className="hover:text-blue-500">↗ Share</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

  );

};

export default Blog;