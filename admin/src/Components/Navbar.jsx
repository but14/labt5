import React from 'react'


import { BsPersonCheck } from "react-icons/bs";

const Navbar = () => {
    return (
        <nav className='mx-auto max-w-full px-2 md:px-20 lg:px-20 flexBetween bg-white py-3 ring-1 ring-slate-900/5 relative'>
            <div className='uppercase text-xl font-semibold text-black px-3 rounded-md tracking-widest line-clamp-1 max-xs:py-2 max-xs:px-1'>Admin Page</div>
            <div className='bg-slate-900 p-1 rounded-full'><BsPersonCheck className='w-8 h-8 text-white'/></div>
        </nav>
    )
}

export default Navbar
