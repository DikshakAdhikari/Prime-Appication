import mongoose, { Schema } from "mongoose";

const blogSchema= new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
       type: Schema.Types.ObjectId,
       ref:'user',
       required:true 
    }
},{timestamps:true})

const blog= mongoose.model('blogging',blogSchema)
export default blog