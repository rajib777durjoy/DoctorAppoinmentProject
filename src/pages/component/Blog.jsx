
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import useAuth from '../../Hook/useAuth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AxiosPublic from '../../Hook/AxosPublic';
import axiosSecure from '../../Hook/axiosSecure';
import Swal from 'sweetalert2';



const Blog = () => {
  const axiosPublic = AxiosPublic();
  const AxiosSecure = axiosSecure()
  const { user } = useAuth();
  const [comment, setComment] = useState();
  const [commentId, setCommentId] = useState();
  const [postId,setPostId]=useState();
  const [commentText,setEditcommentText]=useState('')
  const [loading,setLoading]=useState(false)

 
  const { data: newsData = []} = useQuery({
    queryKey: ['post', user?.email,loading],
    queryFn: async () => {
      const res = await axiosPublic.get(`/post_preview/${user?.email}`);
      return res.data;
    }
  });
  
  const handleLike = async (post_id) => {
    setLoading(true)
    const res = await AxiosSecure.post(`/blog_liked/${post_id}/${user?.email}`);
    console.log("respons:::", res.data?.message);
    if (res?.data?.message) {
      setLoading(false);
     
    }
  }
  const hasUserLiked = (likeId, userEmail) => {
    if (!Array.isArray(likeId)) return false;
    return likeId.some(like => like.user_email === userEmail);
  };

  /* Function for Comment management  */
  const { data: commentList = [],refetch } = useQuery({
    queryKey: ['commentData', commentId],
    queryFn: async () => {
      const res = await axiosPublic(`/allCommentlist/${commentId}`);
      console.log('all comment', res.data);
      return res.data
    }
  })
  console.log(commentList.length)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(comment, commentId)
    const Comment = {
      comment
    }
    const res = await AxiosSecure.post(`/post/comment/${commentId}/${user?.email}`, Comment)
    console.log(res?.data?.insertedId)
    if (res?.data?.insertedId) {
      // alert('comment successful !')
      setComment('');
      refetch()
    }
  }
  // Comment Edit functionality is here  //
   const handleEditfunction=(post_id,CommentText)=>{
    setPostId(post_id)
    setEditcommentText(CommentText);
    document.getElementById('my_modal_2').showModal();
  }

// comment Edit Submit Functionality is here //
 const handleEditTextSubmit=(e)=>{
   e.preventDefault();
   const text=e.target.text.value;
   console.log('text',text);
   const comment={
    comment:text
   }
   axiosPublic.patch(`/comment/edit/${postId}`,comment)
   .then(res=>{
    console.log(res.data.modifiedCount>0)
    if(res.data.modifiedCount>0){
      document.getElementById('my_modal_2').close();
      refetch()
    }
   })
 }

 // comment Delete functionality is here //
  const handleDelete = async(id) => {
    const res= await axiosPublic.delete(`/comment/delete/${id}`)
    console.log(res.data.deletedCount)
    if(res.data?.deletedCount){
     refetch();
    }
  };

  // loading for  page refetch like... user click like button //
  // then page refetch and newsData reload  //

   if(loading){
    return <div className='text-center text-5xl text-red-600'>Loading....</div>
  }
 
  return (
    <section className="w-full py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-amber-500 mb-10">
          Health & Wellness Blogs
        </h1>
        {/* {
            liked?<div className='text-2xl text-green-500'>Hello world</div>:<div className='text-2xl text-rose-500'>false</div>
           } */}
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
                  className="w-full max-h-[300px] object-fill"
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
                  <button onClick={() => handleLike(item?._id)} className={`${hasUserLiked(item.likeId, user?.email) ? "text-amber-500" : "text-black"} hover:text-amber-500 text-black`}>{item?.like}👍Like </button>
                  <button onClick={() => {
                    document.getElementById('my_modal_1').showModal()
                    setCommentId(item?._id)
                  }} className="hover:text-amber-500">💬 Comment</button>
                  <Link to={`/blog/${item?._id}`} className="hover:text-amber-500 font-medium">
                    Read more →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/*---------------------Comment Modal------------------*/}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button> */}
      <dialog id="my_modal_1" className="modal">

        <div className="modal-box">

          <h1 className='text-xl text-center text-amber-500 font-bold'>Previews Comment -({commentList.length})</h1>
          <div className='w-[100%] max-h-[300px] overflow-scroll'>
            {
              commentList.map((comment, index) => (
                <div key={index} className="w-full max-w-xl mx-auto my-3 p-4 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
                  <div className="flex justify-between items-start gap-3 border-b border-yellow-200 ">
                    <div className='flex items-center gap-3 pb-2 mb-3'>
                      <img
                        src={comment.userInfo?.photoURL}
                        alt={comment.userInfo?.name || 'User'}
                        className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
                      />

                      <div>
                        <h2 className="text-black font-semibold text-md">{comment.userInfo?.name || 'Anonymous'}</h2>
                        <p className="text-yellow-600 text-sm">
                          {new Date(comment.date).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <button className='px-2  font-bold text-xl'><details className="dropdown">
                      <summary className="btn m-1">...</summary>
                      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-[40px] p-2 shadow-sm">
                        <li onClick={() => handleEditfunction(comment?._id,comment?.comment)}><a>Edit </a></li>
                        <li onClick={() => handleDelete(comment?._id)}><a>Delete</a></li>
                      </ul>
                    </details></button>
                  </div>
                  <p className="text-yellow-900 whitespace-pre-line">{comment.comment}</p>
                </div>
              ))
            }

          </div>
          <h3 className="font-bold text-lg mb-4 text-amber-500">Leave a Comment</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className="textarea w-full  overflow-scroll" rows={3}
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="modal-action mt-4 flex justify-between">
              <button type="button" className="btn bg-amber-400" onClick={() => { document.getElementById('my_modal_1').close() }}>
                Cancel
              </button>
              <button type="submit" className="btn bg-amber-400">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => handleEditFunction(item?._id)}>open modal</button> */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form action='' onSubmit={handleEditTextSubmit}>
          <textarea name="text" className='w-[100%]' id="" rows={5} defaultValue={commentText ||''}>

          </textarea>
          <button type='submit' className='btn bg-amber-400'>Save</button>
        </form>
        </div>
      </dialog>

    </section>

  );

};

export default Blog;

