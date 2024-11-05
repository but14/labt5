import React from 'react';
import Sidebar from '../Components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../Components/AddProduct';
import ListProduct from '../Components/ListProduct';
import AddCategory from '../Components/AddCategory';
import UpdateProduct from '../Components/UpdateProduct';
import { useParams } from 'react-router-dom'; // Import useParams

const Admin = () => {
    return (
        <div className='lg:flex'>
            <Sidebar />
            <Routes>
                <Route path='/addproduct' element={<AddProduct />} />
                <Route path='/addcategory' element={<AddCategory />} />
                <Route path='/updateproduct/:id' element={<UpdateProductWrapper />} />
                <Route path='/listproduct' element={<ListProduct />} />
            </Routes>
        </div>
    );
};

// Updated UpdateProductWrapper to use useParams
const UpdateProductWrapper = () => {
    const { id } = useParams(); // Extract the product ID from the URL
    return <UpdateProduct productId={id} />;
};

export default Admin;
