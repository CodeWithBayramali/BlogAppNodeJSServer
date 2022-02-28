import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    commentText: {
        type: String,
        required: true
    },
    userName: {
        type:String,
        required:true
    },
    blogId: {
        type:String,
        required: true
    }
})

const Comment = mongoose.model('Comment',commentSchema)

export default Comment