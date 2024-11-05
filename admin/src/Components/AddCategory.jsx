import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";
import fileUpload from '../assets/upload.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [image, setImage] = useState(null);
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const [categoryDetails, setCategoryDetails] = useState({
        name: '',
        image: ''
    });

    const changeHandler = (e) => {
        setCategoryDetails({ ...categoryDetails, [e.target.name]: e.target.value });
    }

    const addCategory = async () => {
        let responseData;
        let category = { ...categoryDetails };
        let formData = new FormData();
        
        // Ensure the field name here matches what the server expects (i.e., 'category')
        formData.append('category', image); 

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((res) => res.json()).then((data) => { responseData = data });

        if (responseData.success) {
            category.image = responseData.image_url; // Set the image URL returned by the server
            
            await fetch('http://localhost:4000/addcategory', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Add Category Response:', data); // Log the response for debugging
                    if (data.success) {
                        toast.success('Category Added Successfully!');
                    } else {
                        toast.error('Failed to Add Category!');
                    }
                });
        } else {
            toast.error('Failed to upload image!');
        }
    }

    return (
        <div className='p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7'>
            <ToastContainer />
            <div className='mb-3'>
                <h4 className='text-[17px] font-semibold pb-2'>Category Name: </h4>
                <input
                    className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'
                    type="text"
                    name='name'
                    value={categoryDetails.name}
                    placeholder='Type here...'
                    onChange={changeHandler}
                />
            </div>

            <div>
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : fileUpload}
                        alt="Uploaded"
                        className='w-20 border-2 border-dotted border-gray-20 p-2'
                    />
                </label>
                <input
                    type="file"
                    name='image' // This is not used in FormData, but it's good practice to keep it
                    id='file-input'
                    hidden
                    onChange={imageHandler}
                />
            </div>

            <button onClick={addCategory} className='btn_dark_rounded mt-6 flexCenter gap-x-1'>
                <MdAdd /> Add Category
            </button>
        </div>
    );
};

export default AddCategory;
