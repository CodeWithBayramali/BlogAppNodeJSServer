import express from 'express'
import mongoose from 'mongoose'
import Category from '../db/categoryModel.js'
import Blog from '../db/blogModel.js'

const router = express.Router()


//Get Category
router.get('/', async (req,res)=>{
    try {
        
        const categories = await Category.find()
        res.status(200).json(categories)

    } catch (error) {
        res.status(404).json({message: 'Category can not find !'})
    }
})


//Create Category
router.post('/', async (req,res)=> {
    try {
        
        const category = req.body
        const createCategory = await Category.create(category)
        res.status(201).json(createCategory)

    } catch (error) {
        res.json({message: 'Create Category Failed !'})
    }
})

//Get Blog By Category

router.get('/:id', async (req,res) => {
    try {
        
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message: 'No Memory'})
        
        const blogs = await Blog.find({categoryId:id})
        if(!blogs) return

        res.status(200).json(blogs)

    } catch (error) {
        console.log(error)
    }
})


export default router