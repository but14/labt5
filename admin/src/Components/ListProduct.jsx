import React, { useEffect, useState } from 'react';
import { BsTrash } from "react-icons/bs";

const ListProduct = () => {
    const [allProduct, setAllProduct] = useState([]);

    const fetchInfo = async () => {
        const res = await fetch('http://localhost:4000/allproducts');
        const data = await res.json();
        setAllProduct(data);
    }

    useEffect(() => {
        fetchInfo();
    }, [])


    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
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
                            <th className='p-2'>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProduct.map((product, i) => (
                            <tr className='border-b border-slate-900/20 text-gray-20 p-6 medium-14' key={i}>
                                <td className='flexStart sm:flexCenter'>
                                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} className='rounded-lg ring-1 ring-stone-900/5 my-1' />
                                </td>
                                <td><div className='line-clamp-3'>{product.name}</div></td>
                                <td>${product.old_price}</td>
                                <td>${product.new_price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <div className='bold-22 pl-6 sm:pl-12'>
                                        <BsTrash
                                            onClick={() => remove_product(product.id)}
                                            className='text-gray-500 text-xl cursor-pointer'
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListProduct;
