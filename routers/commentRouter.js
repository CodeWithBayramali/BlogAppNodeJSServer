import express from 'express'
import mongoose from 'mongoose'
import Comment from '../db/commentModel.js'

const router = express.Router()

router.post('/', async (req,res)=> {
    try {
        const sendComment = req.body
        const data= await Comment.create(sendComment)
        res.status(201).json(data)
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req,res)=> {
    try {
        const {id} = req.params
       const comments = await Comment.find({blogId:id})
       res.status(200).json(comments)
    } catch (error) {
        console.log(error)
    }
})

export default router