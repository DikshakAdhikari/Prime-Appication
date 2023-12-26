import express from 'express'
import user from '../models/user'

const userRouter= express.Router()

userRouter.post('/' , async (req, res)=> {
    try{
        const {fullName, email, password} = req.body
        const data= await user.create({
            fullName , email, password
        })
        data.save()
        console.log(data);
        
    }catch(err){
        res.status(403).json(err)
    }
})



export default userRouter