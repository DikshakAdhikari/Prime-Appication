import express from 'express'
import user from '../models/user'
import { generateToken } from '../services/auth'

const userRouter= express.Router()

userRouter.post('/' , async (req, res)=> {
    try{
        const {fullName, email, password} = req.body
        const data= await user.create({
            fullName , email, password
        })
        data.save()
        console.log(data);
        
         const token = generateToken(data._id,email,data.role)
         res.cookie('token',token ,{ maxAge: 900000, httpOnly: true })
         res.send('Cookie has been sent!')

    }catch(err){
        res.status(403).json(err)
    }
})

userRouter.post('/signin', async (req, res)=> {
    try{
        const {fullName, email, password} = req.body
        

    }catch(err){
        res.status(403).json(err)
    }
})



export default userRouter