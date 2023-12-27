import express from 'express'
import { verifyJwt } from '../middlewares/veriftJwt'

const blogRouter= express.Router()

blogRouter.post('/', verifyJwt , async(req,res)=> {
    try{
       
        res.send(req.cookies['token'])
        
    }catch(err){
        res.json(err)
    }
})


export default blogRouter