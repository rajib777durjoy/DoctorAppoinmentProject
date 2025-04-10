import React from 'react';
import { motion} from "motion/react";

const Blog = () => {
    return (
        <div className='w-[100%] min-h-screen my-10 py-5'>
            <div className='w-[60%] mx-auto  '>
                < motion.h1
                 initial={{opacity:0,y:20}}
                 whileInView={{opacity:1,y:0}}
                 transition={{duration:.5}}
                 className='text-4xl text-center font-bold'>Latest News & Blogs</motion.h1>
                <motion.p
                initial={{opacity:0,y:30}}
                whileInView={{opacity:1,y:0}}
                transition={{duration:.5,delay:.2}} 
                className='text-sm text-center my-4 pb-10'>Doctors on the Frontline: Fighting the Latest Global Health Crisis.The Doctor Shortage Crisis: How It's Affecting Patient Care.Medical Breakthroughs: How Doctors Are Changing the Future of Healthcare</motion.p>
            </div>
            <div className='w-[90%] mx-auto grid md:grid-cols-3 gap-4'>
                <motion.div
               initial={{opacity:0,scale:.9}}
               whileInView={{opacity:1,scale:1}}
                transition={{duration:.4,delay:.2}}
                 className="card bg-base-100 shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Card Title
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div>
                            <div className="badge badge-outline">Products</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
               initial={{opacity:0,scale:.9}}
               whileInView={{opacity:1,scale:1}}
                transition={{duration:.4,delay:.2}}
                 className="card bg-base-100  shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Card Title
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div>
                            <div className="badge badge-outline">Products</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                initial={{opacity:0,scale:.9}}
                whileInView={{opacity:1,scale:1}}
                transition={{duration:.4,delay:.2}}
                className="card bg-base-100  shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Card Title
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div>
                            <div className="badge badge-outline">Products</div>
                        </div>
                    </div>

                </motion.div>
            </div>
            <div className='w-[40%] mx-auto my-10'>
                <button className='btn translate-x-60'>View more</button>
            </div>
        </div>
    );
};

export default Blog;