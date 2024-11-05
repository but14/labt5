import React, { useEffect, useState } from 'react';
import { MdAdd } from "react-icons/md";
import fileUpload from '../assets/upload.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProduct = ({ productId }) => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: '',
        category: 'men',
        new_price: '',
        old_price: ''
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            const res = await fetch(`http://localhost:4000/product/${productId}`);
            const data = await res.json();
            if (data.success) {
                setProductDetails({
                    name: data.product.name,
                    category: data.product.category,
                    new_price: data.product.new_price,
                    old_price: data.product.old_price
                });
            } else {
                toast.error("Failed to fetch product details.");
            }
        };

        fetchProductDetails();
    }, [productId]);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const updateProduct = async () => {
        // Only upload a new image if one is selected
        let imageUrl = '';
        if (image) {
            let formData = new FormData();
            formData.append('product', image);

            // Upload the new image
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });

            const uploadData = await uploadResponse.json();
            if (!uploadData.success) {
                toast.error("Image upload failed!");
                return;
            }
            imageUrl = uploadData.image_url; // Store the uploaded image URL
        } else {
            // If no new image, keep the current image URL
            const res = await fetch(`http://localhost:4000/product/${productId}`);
            const data = await res.json();
            imageUrl = data.product.image; // Assuming the image URL is stored in the product data
        }

        // Prepare updated product data with the uploaded image URL
        const updatedProduct = {
            ...productDetails,
            image: imageUrl,
        };

        // Update the product
        const updateResponse = await fetch(`http://localhost:4000/updateproduct/${productId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct),
        });

        const updateData = await updateResponse.json();
        if (updateData.success) {
            toast.success('Product Updated Successfully!');
            // Reset the form
            setProductDetails({ name: '', category: 'men', new_price: '', old_price: '' });
            setImage(null);
        } else {
            toast.error('Failed to Update Product!');
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

            <button onClick={updateProduct} className='btn_dark_rounded mt-6 flexCenter gap-x-1'>
                <MdAdd /> Update Product
            </button>
        </div>
    );
};

export default UpdateProduct;
