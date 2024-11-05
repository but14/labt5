import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaList } from "react-icons/fa"; // Using Font Awesome icons

const Sidebar = () => {
    return (
        <div className='py-7 flex justify-center gap-x-2 gap-y-5 w-full bg-white sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6'>
            <Link to={'/addproduct'}>
                <button className='flexCenter gap-2 rounded-md bg-primary h-12 w-40 medium-14 sm:medium-16'>
                    <FaPlus className='w-[30px] h-[30px] bg-gradient-to-r from-indigo-500   p-2 rounded-md text-gray-100' />
                    <span>Add Product</span>
                </button>
            </Link>

            <Link to={'/listproduct'}>
                <button className='flexCenter gap-2 rounded-md bg-primary h-12 w-40 medium-14 sm:medium-16'>
                    <FaList className='w-[30px] h-[30px] bg-gradient-to-r from-indigo-500  p-2 rounded-md text-gray-100' />
                    <span>Product List</span>
                </button>
            </Link>
        </div>
    );
}

export default Sidebar;
