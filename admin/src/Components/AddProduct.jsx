import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";
import fileUpload from '../assets/upload.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: '',
        category: 'men',
        new_price: '',
        old_price: ''
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const addProduct = async () => {
        if (!image) {
            toast.error("Please upload an image!");
            return;
        }

        let formData = new FormData();
        formData.append('product', image);

        // Upload the image
        const uploadResponse = await fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (!uploadData.success) {
            toast.error("Image upload failed!");
            return;
        }

        // Prepare product data with the uploaded image URL
        const product = {
            ...productDetails,
            image: uploadData.image_url,
        };

        // Add the product
        const addResponse = await fetch('http://localhost:4000/addproduct', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product),
        });

        const addData = await addResponse.json();
        if (addData.success) {
            toast.success('Product Added Successfully!');
            // Reset the form
            setProductDetails({ name: '', category: 'men', new_price: '', old_price: '' });
            setImage(null);
        } else {
            toast.error('Failed to Add Product!');
        }
    };

    return (
        <div className='p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7'>
            <ToastContainer />
            <div className='mb-3'>
                <h4 className='text-[17px] font-semibold pb-2'>Product Title: </h4>
                <input
                    className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'
                    type="text"
                    name='name'
                    value={productDetails.name}
                    placeholder='Type here...'
                    onChange={changeHandler}
                />
            </div>

            <div className='mb-3'>
                <h4 className='text-[17px] font-semibold pb-2'>Old Price: </h4>
                <input
                    className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'
                    type="text"
                    name='old_price'
                    value={productDetails.old_price}
                    placeholder='Type here...'
                    onChange={changeHandler}
                />
            </div>

            <div className='mb-3'>
                <h4 className='text-[17px] font-semibold pb-2'>New Price: </h4>
                <input
                    className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'
                    type="text"
                    name='new_price'
                    value={productDetails.new_price}
                    placeholder='Type here...'
                    onChange={changeHandler}
                />
            </div>

            <div className='mb-3 flex items-center gap-x-4'>
                <h4 className='text-[17px] font-semibold pb-2'>Product Category: </h4>
                <select
                    name="category"
                    value={productDetails.category}
                    onChange={changeHandler}
                    className='bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none'
                >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                </select>
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
                    name='image'
                    id='file-input'
                    hidden
                    onChange={imageHandler}
                />
            </div>

            <button onClick={addProduct} className='btn_dark_rounded mt-6 flexCenter gap-x-1'>
                <MdAdd /> Add Product
            </button>
        </div>
    );
};

export default AddProduct;
