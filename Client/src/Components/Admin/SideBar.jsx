import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const SideBar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
      <NavLink end={true} to="/admin" className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive && "bg-[#3EA6A9]/25 border-r-4 border-[#3EA6A9]"}`}>
        <img src={assets.home_icon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>Dashboard</p>
      </NavLink>

            <NavLink to="/admin/addblog" className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive && "bg-[#3EA6A9]/25 border-r-4 border-[#3EA6A9]"}`}>
        <img src={assets.add_icon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>Add Blog</p>
      </NavLink>


               <NavLink to="/admin/listblog" className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive && "bg-[#3EA6A9]/25 border-r-4 border-[#3EA6A9]"}`}>
        <img src={assets.list_icon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>List Blogs</p>
      </NavLink>

                   <NavLink to="/admin/comments" className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive && "bg-[#3EA6A9]/25 border-r-4 border-[#3EA6A9]"}`}>
        <img src={assets.comment_icon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>


    

    
    </div>
  )
}

export default SideBar
