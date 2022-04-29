import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import blogRouter from './routers/blogRouter.js'
import categoryRouter from './routers/categoryRouter.js'
import userRouter from './routers/userRouter.js'
import commentRouter from './routers/commentRouter.js'
import contactRouter from './routers/contactRouter.js'

dotenv.config()

const app = express()
app.use(cors())
const port = process.env.PORT || 8000


//localhost/blogs
app.use(express.json( {limit: '20mb'} ))
app.use('/blogs', blogRouter)
app.use('/category', categoryRouter)
app.use('/user',userRouter)
app.use('/comment',commentRouter)
app.use('/contact',contactRouter)

app.listen(port, ()=> {
    
    mongoose.connect("YOUR DB URI",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})
