import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import useAuth from '../../Hook/useAuth';
import AxiosPublic from '../../Hook/AxosPublic';
import axiosSecure from '../../Hook/axiosSecure';

const Blog = () => {
  const axiosPublic = AxiosPublic();
  const AxiosSecure = axiosSecure();
  const { user } = useAuth();

  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState(null);
  const [postId, setPostId] = useState(null);
  const [commentText, setEditcommentText] = useState('');
  const [loading, setLoading] = useState(false);

  // Posts
  const { data: newsData = [], isLoading } = useQuery({
    queryKey: ['post', user?.email, loading],
    queryFn: async () => {
      const res = await axiosPublic.get(`/post_preview`);
      return res.data;
    }
  });

  // Likes
  const handleLike = async (post_id) => {
    setLoading(true);
    await AxiosSecure.post(`/blog_liked/${post_id}/${user?.email}`);
    setLoading(false);
  };

  const hasUserLiked = (likeId, email) => {
    if (!Array.isArray(likeId)) return false;
    return likeId.some(like => like.user_email === email);
  };

  // Comments
  const { data: commentList = [], refetch } = useQuery({
    queryKey: ['commentData', commentId],
    queryFn: async () => {
      const res = await axiosPublic(`/allCommentlist/${commentId}`);
      return res.data;
    },
    enabled: !!commentId
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AxiosSecure.post(
      `/post/comment/${commentId}/${user?.email}`,
      { comment }
    );
    setComment('');
    refetch();
  };

  const handleEditfunction = (id, text) => {
    setPostId(id);
    setEditcommentText(text);
    document.getElementById('my_modal_2').showModal();
  };

  const handleEditTextSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;

    const res = await axiosPublic.patch(`/comment/edit/${postId}`, {
      comment: text
    });

    if (res.data.modifiedCount > 0) {
      document.getElementById('my_modal_2').close();
      refetch();
    }
  };

  const handleDelete = async (id) => {
    await axiosPublic.delete(`/comment/delete/${id}`);
    refetch();
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-amber-500 animate-pulse">
          Loading posts...
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-amber-50">

      {/* HERO */}
      <div className="text-center py-14 px-4">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Health & Wellness Blog
        </h1>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Discover insights, tips, and expert knowledge to improve your lifestyle and wellbeing.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {newsData?.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border"
          >

            {/* USER */}
            <div className="flex items-center gap-3 p-4 border-b">
              <img
                src={item?.user_profile || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {item?.name}
                  <span className="text-xs text-amber-500 ml-1">
                    ({item?.role})
                  </span>
                </h3>
                <p className="text-xs text-gray-400">
                  {new Date(item?.createdAt).toDateString()}
                </p>
              </div>
            </div>

            {/* IMAGE */}
            <img
              src={item?.Image}
              className="h-48 w-full object-cover"
              alt=""
            />

            {/* CONTENT */}
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                {item?.title}
              </h2>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {item?.content?.slice(0, 140)}...
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item?.tags?.split(',').map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-5 text-sm">

                <button
                  onClick={() => handleLike(item?._id)}
                  className={`flex items-center gap-1 font-medium ${
                    hasUserLiked(item.likeId, user?.email)
                      ? "text-amber-500"
                      : "text-gray-600"
                  }`}
                >
                  👍 {item?.like || 0}
                </button>

                <button
                  onClick={() => {
                    setCommentId(item?._id);
                    document.getElementById('my_modal_1').showModal();
                  }}
                  className="text-gray-600 hover:text-amber-500"
                >
                  💬 Comment
                </button>

                <Link
                  to={`/blog/${item?._id}`}
                  className="text-amber-600 font-semibold"
                >
                  Read →
                </Link>

              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* COMMENT MODAL */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">

          <h3 className="text-lg font-bold text-amber-500 mb-3">
            Comments ({commentList.length})
          </h3>

          <div className="max-h-60 overflow-y-auto space-y-3 mb-4">

            {commentList.map((c) => (
              <div key={c._id} className="p-3 bg-amber-50 rounded-lg">

                <div className="flex justify-between">
                  <p className="font-semibold text-sm">
                    {c.userInfo?.name}
                  </p>

                  <details>
                    <summary className="cursor-pointer">⋮</summary>
                    <ul className="bg-white shadow rounded p-2 text-sm">
                      <li onClick={() => handleEditfunction(c._id, c.comment)}>Edit</li>
                      <li onClick={() => handleDelete(c._id)}>Delete</li>
                    </ul>
                  </details>
                </div>

                <p className="text-sm mt-1">{c.comment}</p>

              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
            />

            <div className="flex justify-end gap-2 mt-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => document.getElementById('my_modal_1').close()}
              >
                Cancel
              </button>

              <button className="px-4 py-2 bg-amber-500 text-white rounded">
                Submit
              </button>
            </div>
          </form>

        </div>
      </dialog>

      {/* EDIT MODAL */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form onSubmit={handleEditTextSubmit}>
            <textarea
              name="text"
              defaultValue={commentText}
              className="w-full border p-2 rounded"
              rows={5}
            />

            <button className="mt-3 w-full bg-amber-500 text-white py-2 rounded">
              Save Changes
            </button>
          </form>
        </div>
      </dialog>

    </section>
  );
};

export default Blog;

