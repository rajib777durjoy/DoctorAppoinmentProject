import React, { useEffect } from 'react';
import { motion} from "motion/react";

const Category = () => {
    

    return (
        <div className='w-[100%] '>
            <div className='w-[50%] mx-auto my-10 py-5 '>
            <h1 className='text-center text-4xl font-bold '> Categores</h1>
            </div>
            <div className='w-[90%] mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-4 py-10'>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                 className="card hover:bg-slate-300 shadow-md shadow-amber-300 hover:shadow-md hover:shadow-gray-400">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Card Title</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions">
                            <button className="btn bg-amber-300">Buy Now</button>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
                 className="card hover:bg-slate-300 shadow-md shadow-amber-300 hover:shadow-md hover:shadow-gray-400">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Card Title</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions">
                            <button className="btn bg-amber-300">Buy Now</button>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
                 className="card hover:bg-slate-300 shadow-md shadow-amber-300 hover:shadow-md hover:shadow-gray-400">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Card Title</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions">
                            <button className="btn bg-amber-300">Buy Now</button>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                 className="card hover:bg-slate-300 shadow-md shadow-amber-300 hover:shadow-md hover:shadow-gray-400">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Card Title</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions">
                            <button className="btn bg-amber-300">Buy Now</button>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                 className="card hover:bg-slate-300 shadow-md shadow-amber-300 hover:shadow-md hover:shadow-gray-400">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Card Title</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions">
                            <button className="btn bg-amber-300">Buy Now</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Category;