import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import blogRouter from './routers/blogRouter.js'
import categoryRouter from './routers/categoryRouter.js'
import userRouter from './routers/userRouter.js'
import commentRouter from './routers/commentRouter.js'

dotenv.config()

const app = express()
app.use(cors({
origin: 'https://alidurak.surge.sh',
    optionsSuccessStatus:200
}))

//localhost/blogs
app.use(express.json( {limit: '20mb'} ))
app.use('/blogs', blogRouter)
app.use('/category', categoryRouter)
app.use('/user',userRouter)
app.use('/comment',commentRouter)

app.listen(process.env.PORT, ()=> {
    
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})
