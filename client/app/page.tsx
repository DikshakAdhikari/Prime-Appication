"use client"
import { ChangeEvent, FormEvent, useState } from "react"
export default function Home() {
  const [file, setFile]= useState<File|null>(null)
  const [title, settitle]= useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')

  const handleLogin= async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const res= await fetch('http://localhost:3001/user/signin',{
        method:"POST",
        credentials:'include',
        headers:{
          Accept: 'application/json',
          'Content-Type':'application/json'
        },
        //credentials: 'same-origin',
        body:JSON.stringify({email,password}),
      })
      if(!res.ok){
        throw new Error('Network connection error!')
      }

    }catch(err){
      console.log(err);
      
    }
  }

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

      <form onSubmit={handleLogin} className=" border-[2px] flex flex-col items-center gap-5" action="">
        <div className=" text-[1.7rem] text-gray-800">Login</div>
         <input onChange={(e)=> setEmail(e.target.value)} type="text" className=" w-[40vw] border-[1px] border-gray-500 p-3"  placeholder="Email" />
         <input onChange={(e)=> setPassword(e.target.value)} type="text" className=" w-[40vw] border-[1px] border-gray-500 p-3"  placeholder="Password"/>
         <button className=" w-[10vw] bg-blue-500 p-3 rounded-lg" type="submit">Login</button>
      </form>


    <form   onSubmit={handleSubmit} className="  pt-20  items-center justify-center flex flex-col gap-4" >
    <div className=" text-[1.7rem] text-gray-800">Form</div>
      <input type="file" required onChange={handleFileChange} className="  w-[40vw]  p-3"  />
       <input type="text" required onChange={(e)=> settitle(e.target.value)} placeholder="title" className=" w-[40vw] border-[1px] border-gray-500 p-3"  />
        <input required placeholder=" description" onChange={(e)=> setDescription(e.target.value)} className=" p-3 w-[40vw]" ></input>
       <button className=" w-[10vw] bg-blue-500 p-3 rounded-lg" type="submit">Submit</button>
    </form>
    <div>
    <div>
      <img src="public/uploads/1703784861038.csxmprfh.webp" alt="" />
    </div>
    </div>
    </div>
      )
}
