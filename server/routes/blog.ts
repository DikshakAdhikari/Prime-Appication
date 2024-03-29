import express from 'express'
import { verifyJwt } from '../middlewares/veriftJwt'
import multer from 'multer'
import blog from '../models/blog'
import path from 'path'
const blogRouter= express.Router()

//  blogRouter.use(express.static(path.resolve('./public/uploads/')));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //console.log(req.headers['userId']);
      cb(null, path.resolve('./public/uploads/'))
    },
    filename: function (req, file, cb) {
        // console.log(file.mimetype); // image/jpeg
        // const ext = file.mimetype.split("/")[1]; //jpeg
        const fileName= `${Date.now()}-${file.originalname}`
      cb(null, fileName) // .jpeg
    }
  })

  const upload = multer({ storage: storage })

blogRouter.post('/', verifyJwt , upload.single('file'), async(req,res)=> {
    try{
        const {title , description}= req.body
         const userId= req.headers['userId']
         console.log(req.file?.filename);
         
        const data = await blog.create({
            imageUrl: `/uploads/${req.file?.filename}`,
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

blogRouter.get('/all' , async(req, res)=> {
    try{
        const data= await blog.find({})
        res.json(data)
    }catch(err){
        res.status(403).json(err)
    }
})

export default blogRouter