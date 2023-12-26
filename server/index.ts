import express from 'express'
import dotenv from 'dotenv'
import connectDb from './connection/connect'
import userRouter from './routes/user'
dotenv.config()

connectDb()

const app= express()

app.use(express.json())

app.use('/user',userRouter)

app.listen(process.env.PORT , ()=> console.log(`Server listening on port ${process.env.PORT}`))




