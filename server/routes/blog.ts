import express from 'express'
import { verifyJwt } from '../middlewares/veriftJwt'
import multer from 'multer'
import blog from '../models/blog'

const blogRouter= express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //console.log(req.headers['userId']);
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        // console.log(file.mimetype); // image/jpeg
        // const ext = file.mimetype.split("/")[1]; //jpeg
      cb(null, Date.now()+ '.' + file.originalname ) // .jpeg
    }
  })

  const upload = multer({ storage: storage })

blogRouter.post('/', verifyJwt , upload.single('file'), async(req,res)=> {
    try{
        const {title , description}= req.body
         const userId= req.headers['userId']
        const data = await blog.create({
            imageUrl: req.file?.path,
            title: title,
            description: description,
            createdBy: userId,
        })
        await data.save()
        
    res.send('Blog successfully uploaded!')
        
    }catch(err){
        res.json(err)
    }
})


blogRouter.get('/', verifyJwt , async(req, res)=> {
    try{
        const data= await blog.find({})
        res.json('./public/uploads/1703783196541.2023-11-20-165858.jpg')
    }catch(err){
        res.status(403).json(err)
    }
})

export default blogRouter