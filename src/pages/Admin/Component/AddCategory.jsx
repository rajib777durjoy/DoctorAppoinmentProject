import React, { useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import Swal from 'sweetalert2';


const AddCategory = () => {
    const AxioSecure = axiosSecure();
    const [value,setValue]=useState('')
    const [degreeValue,setdegreeValue]=useState('');
    const [degreeDetails,setdegreeDetails]=useState('')
    const [description,setDescrption]=useState('')
    console.log('values fdshfdsf',value)
    const handleSubmit =(e)=>{
     e.preventDefault()
     const category = e.target.category.value;
     console.log(category.legend)
     if(category){
        const data={
            category:category
        }
        AxioSecure.post(`/addCategory`,data)
        .then(res=>{
          console.log('add category value is here:',res)
          if(res.data.insertedId){
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
     }
    
     
    }
    const handleSubmit2 =(e)=>{
     e.preventDefault()
     const degreeS = e.target.degree.value;
     if(degreeS){
        const data={
            degree:degreeS
        }
        AxioSecure.post(`/addDegree`,data)
        .then(res=>{
          console.log('add degree value is here:',res)
          if(res.data.insertedId){
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
     }
    
     
    }
    return (
        <div className='w-[100%] border grid grid-cols-2'>

            <form onSubmit={handleSubmit} className='w-[70%] mx-auto'>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Add Category</legend>
                    <input type="text" name='category' onChange={(e)=>setValue(e.target.value)} className="input w-[100%] rounded-md border-2 border-amber-200" placeholder="Type here" />
                    <textarea name="description" onChange={(e)=>{setDescrption(e.target.value)}} rows={5} placeholder='Bio' className='border-2 rounded-xl p-2 border-amber-200' id=""></textarea>
                </fieldset>
                <div>
                    <button type='submit' disabled={value.length < 5 || description.length < 10} className='btn bg-amber-200 rounded-md'>Add Category</button>
                </div>
            </form>
            <form onSubmit={handleSubmit2} className='w-[70%] mx-auto'>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Add Degree</legend>
                    <input type="text" name='degree' onChange={(e)=>setdegreeValue(e.target.value)} className="input rounded-md border-2 w-[100%] border-amber-200" placeholder="Type here" />
                    <textarea name="details" onChange={(e)=>{setdegreeDetails(e.target.value)}} rows={5} placeholder='Bio'className='border-2 rounded-xl p-2 border-amber-200' id=""></textarea>
                </fieldset>
                <div>
                    <button type='submit' disabled={degreeValue.length < 5 || degreeDetails.length < 10} className='btn bg-amber-200 rounded-md'>Add Degree</button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;