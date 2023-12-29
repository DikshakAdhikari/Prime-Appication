"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const router= useRouter()
  const handleClick = ()=> {
    router.push('/login')
    
  }
  return (
    <div className=' items-center px-10 justify-between flex gap-3 p-3 bg-blue-700'>
        <div onClick={()=> router.push('/')} className=' cursor-pointer text-[1.8rem] hover:text-yellow-500 font-semibold text-white'>Snif Blog</div>
        <div className=' items-center flex gap-5'>
            <button onClick={()=> router.push('/signup')} className=' bg-green-600 text-white px-5  p-3 rounded-lg hover:bg-red-700'>Signup</button>
            <button onClick={handleClick} className=' bg-green-600 text-white px-5  p-3 rounded-lg hover:bg-red-700'>Signin</button>
        </div>
    </div>
  )
}

export default Navbar

