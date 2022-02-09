import express from 'express'
import Contact from '../db/contactModel.js'

const router = express.Router();

router.post('/', async (req,res)=> {
    try {
        const data = req.body;
        const result = await Contact.create(data);
        if(!result) return res.status(404).json({message:'Sorry !'})

        res.status(201).json({message:'Successful Thanks !'})

    } catch (error) {
        res.status(404).json(error)
    }
})

export default router;