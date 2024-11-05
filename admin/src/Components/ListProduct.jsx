import React, { useEffect, useState } from 'react';
import { BsTrash, BsPencil } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const ListProduct = () => {
    const [allProduct, setAllProduct] = useState([]);
    const navigate = useNavigate();

    const fetchInfo = async () => {
        try {
            const res = await fetch('http://localhost:4000/allproducts');
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await res.json();
            setAllProduct(data);
        } catch (error) {
            console.error(error);
            // You can also add toast notifications here for user feedback
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        try {
            await fetch('http://localhost:4000/removeproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id })
            });
            fetchInfo(); // Refresh the product list after deletion
        } catch (error) {
            console.error(error);
        }
    }

    const edit_product = (product) => {
        // Navigate to the update product page with the product ID
        navigate(`/updateproduct/${product.id}`); // Use the product ID directly in the URL
    }

    return (
        <div className='p-2 box-border bg-white mb-0 rounded-sm w-full mt-4 sm:p-4 sm:m-7'>
            <h4 className='text-[25px] font-semibold uppercase p-5'>Product List</h4>
            <div className='max-h-[77vh] overflow-auto px-4 text-center'>
                <table className='w-full mx-auto'>
                    <thead>
                        <tr className='bg-primary bold-14 sm:regular-22 text-start py-12'>
                            <th className='p-2'>Products</th>
                            <th className='p-2'>Title</th>
                            <th className='p-2'>Old Price</th>
                            <th className='p-2'>New Price</th>
                            <th className='p-2'>Category</th>
                            <th className='p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProduct.map((product) => (
                            <tr className='border-b border-slate-900/20 text-gray-20 p-6 medium-14' key={product.id}>
                                <td className='flexStart sm:flexCenter'>
                                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} className='rounded-lg ring-1 ring-stone-900/5 my-1' />
                                </td>
                                <td><div className='line-clamp-3'>{product.name}</div></td>
                                <td>${product.old_price}</td>
                                <td>${product.new_price}</td>
                                <td>{product.category}</td>
                                <td className='flex justify-center items-center space-x-4'>
                                    <BsPencil
                                        onClick={() => edit_product(product)} // Pass the product object
                                        className='text-gray-500 text-xl cursor-pointer'
                                    />
                                    <BsTrash
                                        onClick={() => remove_product(product.id)}
                                        className='text-gray-500 text-xl cursor-pointer'
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListProduct;
