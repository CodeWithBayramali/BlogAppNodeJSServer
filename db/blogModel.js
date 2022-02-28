import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    subtitle: {
        type:String,
        required: true
    },
    content: {
        type: String,
        required:true
    },
    creator: {
        type: String,
        required: true
    },
    categoryId: {
        type: String
    },
    image: {
        type:String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    likeCount: {
        type:[],
        required:true
    }
    
})

const Blog = mongoose.model('blog',blogSchema)

export default Blog