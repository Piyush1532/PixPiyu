import React, { useEffect, useState } from 'react'
import {  blog_data } from '../../assets/assets'
import BlogTableItem from '../../Components/Admin/BlogTableItem'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'

const ListBlog = () => {

const [blogs,setBlogs]=useState([])

const {axios}=useAppContext()

const fetchBlogs=async () => {
 try {
  const {data}=await axios.get("/api/admin/blog")
  if (data.success) {
    setBlogs(data.blogs)
  }
  else{
    toast.error(data.message)
  }
 } catch (error) {
  toast.error(error.message)
 }
}

useEffect(()=>{
fetchBlogs()
},[])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16  bg-blue-50/20'>
      <h1>All Blogs</h1>

  <div className='relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white mt-4'>
<table className='w-full text-sm text-grey-500'>
  <thead className='text-xs text-gray-600 text-left uppercase'>
<tr>
  <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
  <th scope='col' className='px-2 py-4 '>Blog Title </th>
  <th scope='col' className='px-2 py-4 maxx-sm:hidden'>Date</th>
  <th scope='col' className='px-2 py-4 maxx-sm:hidden'>Status</th>
  <th scope='col' className='px-2 py-4 '>Action</th>
</tr>
  </thead>
  <tbody>
{blogs.map((blog, index) => (
  <BlogTableItem key={blog._id} blog={blog} fetchBlog={fetchBlogs} index={index+1} />
))}

  </tbody>
</table>
  </div>
    </div>
  )
}

export default ListBlog
