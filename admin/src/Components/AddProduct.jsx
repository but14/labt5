import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";
import fileUpload from '../assets/upload.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {

    const [image, setImage] = useState(false);
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'men',
        new_price: '',
        old_price: ''
    })
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((res) => res.json()).then((data) => { responseData = data })

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Add Product Response:', data); // Log the response for debugging
                    data.success ? alert('Product Added Successfully!') : alert('Failed to Add Product!');
                });
        }
    }




    return (
        <div className='p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7'>
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

            <button onClick={() => Add_Product()} className='btn_dark_rounded mt-6 flexCenter gap-x-1'>
                <MdAdd /> Add Product
            </button>
        </div>
    );
};

export default AddProduct;
