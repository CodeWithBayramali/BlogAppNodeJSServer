import mongoose from 'mongoose'

const tokenSchema = mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    refreshToken: {
        type: String,
    }
})

const Token = mongoose.model('Token',tokenSchema)

export default Token