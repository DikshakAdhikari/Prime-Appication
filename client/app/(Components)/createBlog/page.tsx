"use client"
import React from 'react'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Cookies from "js-cookie"
const page = () => {
   const [file, setFile]= useState<File|null>(null)
  const [title, settitle]= useState('')
  const [description, setDescription] = useState('')
  const [image, setImage]= useState<any>([])

 
  useEffect(()=> {
    const fun = async()=> {
      try{
        const res= await fetch('http://localhost:3001/blog/all',{
        method:"GET",
        credentials:"include", //This is very important in the case when we want to send cookies with the request
        headers:{
          'Content-Type': 'application/json'
        }
      })
      if(!res.ok){
        throw new Error('Network Error!')
      }
      //console.log(Cookies.get('token'));
      const data= await res.json()
      console.log(data);
       setImage(data)
      
      }catch(err){
        console.log(err); 
      }   
    }
    fun()
  },[])

  
  const handleFileChange= (e:ChangeEvent<HTMLInputElement>)=> {
    if(e.target.files !== null && e.target.files.length > 0 ){
        setFile(e.target.files[0])
    }     
  }

  const handleSubmit = async (e:FormEvent)=> {
    e.preventDefault()
    const formData= new FormData()
    if(file){
      formData.append('file', file)
    }
    formData.append('title', title)
    formData.append('description', description)

    try{
      const res= await fetch('http://localhost:3001/blog/', {
        method:"POST",
        credentials: "include",

        body:formData
      })
    }catch(err){
      console.log(err);
      
    }  
  }
  return (
   <div className=" h-[100vh] p-4">
      {image?.map((val:any)=> (
        <div>
          <img src={`http://localhost:3001/${val.imageUrl}`} alt="dsffdgfdgdfsdfsdf" />  {/* format -> http://localhost:3001/uploads/1703846233313.2023-11-20-165834.jpg*/}
        </div>
      ))}   

    <form   onSubmit={handleSubmit} className="  pt-20  items-center justify-center flex flex-col gap-4" >
    <div className=" text-[1.7rem] text-gray-800">Form</div>
      <input type="file" required onChange={handleFileChange} className="  w-[40vw]  p-3"  />
       <input type="text" required onChange={(e)=> settitle(e.target.value)} placeholder="title" className=" w-[40vw] border-[1px] border-gray-500 p-3"  />
        <input required placeholder=" description" onChange={(e)=> setDescription(e.target.value)} className=" p-3 w-[40vw]" ></input>
       <button className=" w-[10vw] bg-blue-500 p-3 rounded-lg" type="submit">Submit</button>
    </form>
    <div>
    <div>
  
    </div>
    </div>
    </div>


  )
}

export default page
