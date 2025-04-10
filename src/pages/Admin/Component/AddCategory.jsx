import React from 'react';
import axiosSecure from '../../../Hook/axiosSecure';

const AddCategory = () => {
    const AxioSecure = axiosSecure()
    const handleSubmit=async(e)=>{
     e.preventDefault()
     const category = e.target.category.value;
     console.log('category',category)
     const res= await AxioSecure.post(`admin/addCategory/${category}`)
      console.log('response',res.data)
    }
    return (
        <div className='w-[100%] border'>
            <form onSubmit={handleSubmit} className='w-[70%] mx-auto'>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Add Category</legend>
                    <input type="text" name='category' className="input" placeholder="Type here" />
                </fieldset>
                <div>
                    <button type='submit' className='btn'>Add Category</button>
                </div>
            </form>

        </div>
    );
};

export default AddCategory;