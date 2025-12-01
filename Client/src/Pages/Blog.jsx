import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../Components/Navbar'
import Moment from "moment"
import Footer from '../Components/Footer'
import Loader from '../Components/Loader'
import { useAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {

 const {blogId}=useParams()

 const {axios}=useAppContext()

const [data,SetData]=useState(null)
const [comments,SetComments]=useState([])

const [name,SetName]=useState("")
const [content,SetContent]=useState("")


const fetchBlogData=async () => {
try {
  const {data}=await axios.get(`/api/blog/${blogId}`)
  data.success ? SetData(data.blog) :toast.error(data.message)
} catch (error) {
  toast.error(error.message)
}
}

const fetchComments=async () => {
 try {
  const {data}=await axios.post(`/api/blog/comments`,{blogId:blogId})
  if (data.success) {
    SetComments(data.comments)
  }else{
    toast.error(data.message)
  }
 } catch (error) {
  toast.error(error.message)
 }
}

const addComment = async (evt) => {
  evt.preventDefault();
  try {
    const { data } = await axios.post(`/api/blog/add-comment`, {
      blog: blogId,   // FIXED
      name,
      content,
    });
 console.log(data)
    if (data.success) {
      toast.success(data.message);
      SetName("");
      SetContent("");
      console.log(data.message)
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};




useEffect(()=>{
fetchBlogData()
fetchComments()
},[])


  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt=""  className='absolute -top-30 -z-1 opacity-50'/>
      <Navbar/>
<div className='text-center mt-10 text-gray-600'>
  <p className='text-[#3EA6A9] py-4 font-medium'>Published on {Moment(data.createdAt).format("do MMMM YYYY")}</p>
  <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
  <h2 className='my-5 max-w-lg truncate mx-auto' dangerouslySetInnerHTML={{__html:data.subTitle}}></h2>
  <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-[#3EA6A9]/35 bg-[#3EA6A9]/20 font-medium text-black/60'>Piyush A</p>
</div>

<div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
  <img src={data.image} alt=""  className='rounded-3xl mb-5'/>

<div dangerouslySetInnerHTML={{__html:data.description}} className='rich-text prose-xl max-w-3xl mx-auto text-wrap font-[26px]'></div>

{/* Comment section */}
<div className='mt-14 mb-10 max-w-3xl mx-auto '>
<p className='font-semibold mb-4'>Comments {comments.length}</p>
<div className='flex flex-col gap-4'>
{comments.map((item,index)=>(
  <div key={index} className='relative bg-[#3ea6a9]/2 border border-[#3ea6a9]/5  max-w-xl p-4 rounded text-gray-600'>
<div className='flex items-center gap-2 mb-2'>
  <img src={assets.user_icon} alt=""  className='w-6'/>
  <p className='font-medium'>{item.name}</p>
</div>
<p className='text-sm max-w-md ml-8'>{item.content}</p>
<div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
  </div>
))}
</div>
</div>


{/* Add comments section  */}
<div className='max-w-3xl mx-auto'>
<p className='font-semibold mb-4'>Add Your Comment</p>
<form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>

<input type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none' onChange={(e)=>SetName(e.target.value)} value={name}/>
<textarea placeholder='Comment' required className='w-full p-2 rounded outline-none h-48  border border-gray-300 ' onChange={(e)=>SetContent(e.target.value)} value={content} ></textarea>
<button type='submit' className='bg-[#3EA6A9] text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
</form>
</div>

{/* share btns */}
<div className='my-24 max-w-3xl mx-auto '>
<p className='font-semibold my-4 '>Share this articles on social media </p>
<div className="flex">
  <img src={assets.facebook_icon} alt="" width={50}/>
  <img src={assets.twitter_icon} alt="" width={50}/>
  <img src={assets.googleplus_icon} alt="" width={50}/>
</div>
</div>


</div>
<Footer/>
    </div>
  ):<Loader/>
}

export default Blog