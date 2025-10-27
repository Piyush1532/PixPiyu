import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data } from '../assets/assets'
import Navbar from '../Components/Navbar'
import Moment from "moment"
const Blog = () => {

 const {id}=useParams()

const [data,SetData]=useState(null)

const fetchBlogData=async () => {
  const data=blog_data.find(item=>item._id===id)
  SetData(data)
}

useEffect(()=>{
fetchBlogData()
},[])
  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt=""  className='absolute -top-30 -z-1 opacity-50'/>
      <Navbar/>
<div className='text-center mt-20 text-gray-600'>
  <p className='text-[#3EA6A9] py-4 font-medium'>Published on {Moment(data.createdAt).format("do MMMM YYYY")}</p>
  <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
  <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
  <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-[#3EA6A9]/35 bg-[#3EA6A9]/20 font-medium text-black/60'>Piyush A</p>
</div>

<div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
  <img src={data.image} alt=""  className='rounded-3xl mb-5'/>

<div dangerouslySetInnerHTML={{__html:data.description}} className='rich-text max-w-3cl mx-auto '></div>

</div>
    </div>
  ):<div>Loading...</div>
}

export default Blog