import React, { useState } from 'react'

const Login = () => {

  const[email,SetEmail]=useState("")
  const[password,SetPassword]=useState("")


const handleSubmit=async (e) => {
  e.preventDefault()
}


  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-[#3EA6A9]/30 shadow-xl shadow-[#3EA6A9]/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-[#3EA6A9]'>Admin</span> Login</h1>
            <p className='font-light'>Enter your credentials to access the admin panel </p>
          </div>


          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
<div className='flex flex-col'>
  <label>Email</label>
  <input type="email" required placeholder='Your Email Id'  className='border-b-2 border-gray-300 p-2 outline-none mb-6' onChange={(e)=>SetEmail(e.target.value)} value={email}/>
</div>

<div className='flex flex-col'>
  <label>Password</label>
  <input type="password" required placeholder='Your Password'  className='border-b-2 border-gray-300 p-2 outline-none mb-6' onChange={(e)=>SetPassword(e.target.value)} value={password}/>
</div>

<button type='submit' className='w-full py-3 font-medium bg-[#3EA6A9] text-white rounded cursor-pointer hover:bg-[#3EA6A9]/85 transition-all'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
