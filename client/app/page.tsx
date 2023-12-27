"use client"

import { ChangeEvent, FormEvent, useState } from "react"

export default function Home() {
  const [file, setFile]= useState<File|null>(null)
  const [title, settitle]= useState('')
  const [description, setDescription] = useState('')

  const handleFileChange= (e:ChangeEvent<HTMLInputElement>)=> {
    if(e.target.files !== null && e.target.files.length > 0 ){
        setFile(e.target.files[0])
    }     
  }

  const handleSubmit = async (e:FormEvent)=> {
    e.preventDefault()
    const formData= new FormData()
    if(file){
      formData.append('image', file)
    }
    formData.append('title', title)
    formData.append('description', description)

    try{
      const res= await fetch('http://localhost:3001/blog/', {
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        body:JSON.stringify(formData)
      })
    }catch(err){
      console.log(err);
      
    }
    
  }
  return (
    <div className=" h-[100vh] p-4">
    <form onSubmit={handleSubmit} className=" h-[100vh]  items-center justify-center flex flex-col gap-4" action="">
      <input type="file" required onChange={handleFileChange} className="  w-[40vw]  p-3"  />
       <input type="text" required onChange={(e)=> settitle(e.target.value)} placeholder="title" className=" w-[40vw] border-[1px] border-gray-500 p-3"  />
        <input required placeholder=" description" onChange={(e)=> setDescription(e.target.value)} className=" p-3 w-[40vw]" ></input>
       <button className=" w-[10vw] bg-blue-500 p-3 rounded-lg" type="submit">Submit</button>
    </form>
    </div>
      )
}
