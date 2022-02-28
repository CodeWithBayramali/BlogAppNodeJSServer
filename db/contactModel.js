import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    }
})

const Contact = mongoose.model('Contact',contactSchema);

export default Contact;