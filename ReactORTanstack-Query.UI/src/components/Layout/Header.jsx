import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const linkClasses = "text-[15px] text-white mr-5";
    return (
        <div className='bg-gray-700 p-3 flex justify-around items-center'>
            <NavLink to={"/"} className='text-3xl font-bold text-yellow-400'>TQ</NavLink>
            <ul className='flex items-center justify-between'>
                <NavLink to={"/"} className={({ isActive }) => isActive ? `${linkClasses} text-yellow-400` : linkClasses}>Home</NavLink>
                <NavLink to={"/emp"} className={({ isActive }) => isActive ? `${linkClasses} text-yellow-400` : linkClasses}>Employee</NavLink>
                <NavLink to={"/dept"} className={({ isActive }) => isActive ? `${linkClasses} text-yellow-400` : linkClasses}>Department</NavLink>
            </ul>
        </div>
    )
}

export default Header