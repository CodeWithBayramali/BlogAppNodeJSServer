import express from 'express'
import mongoose from 'mongoose'
import Blog from '../db/blogModel.js'

const router = express.Router()

//Get All Blog
router.get('/', async (req,res) => {
    try {
        const blogs = await Blog.find().sort({_id: -1})
        res.status(200).json(blogs)
    } catch (error) {
        res.status(404).json({errors: 'no data'})
    }
})

//Get Blog
router.get('/:id', async (req,res)=> {
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) 
            res.status(404).json({message: 'No Memory'})
        
        const blog = await Blog.findById(id)
        if(!blog) return

        res.status(200).json(blog)
        
    } catch (error) {
        res.status(404).json({error: 'Memory Not Found'})
    }
})

//Search Blog
router.get('/search/:q', async (req,res)=> {
    try {
        const {q} = req.params;
        const blog = await Blog.aggregate({ $text: {$search:q}  })
        res.status(200).res.json(blog);
        
    } catch (error) {
        res.status(404).json(error)
    }
})

//Create Blog
router.post('/', async (req,res)=> {
    try {
        const blog = req.body
        const createBlog = await Blog.create(blog)
        res.status(201).json(createBlog)
    } catch (error) {
        res.json({message: 'Create Blog Failed !'})
    }
    
})

//Update Blog
router.put('/:id', async (req,res)=> {

    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message: 'Blog id is not valid'})
    
        const { title, subtitle, content, creator, image } = req.body
        const updatedBlog = await Blog.findByIdAndUpdate(id, {title,subtitle,content,creator,image,_id:id}, {new: true})
    
        res.status(200).json(updatedBlog)
    } catch (error) {
        res.status(404).json({message:'Blog is not updated !'})
    }

})

//Delete Blog
router.delete('/:id', async (req,res)=> {
    try {

        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message: 'Blog id is not valid'})
        
        await Blog.findByIdAndDelete(id)
        res.status(200).json({message: 'Blog has been deleted'})
    } catch (error) {
        res.status(404).json({message:'Blog is not deleted'})
    }
})

router.post('/like/:bid/:uid', async (req,res)=> {
    try {
        const {bid,uid} = req.params
        const userId = await Blog.findOne({_id:bid,likeCount:uid})

        if(userId) return null;

        await Blog.updateOne({_id:bid},{ $push:{likeCount:uid}})
        const resultBlog = await Blog.find().sort({_id:-1})
        res.status(200).json(resultBlog)
    } catch (error) {
        res.status(404).json(error)
    }
})


export default router


