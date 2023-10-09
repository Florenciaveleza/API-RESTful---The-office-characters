import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    occupation: {
        type: String,
        required: true
    },
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    quotes:{
        type: Array,
        required: false
    },
    photo: {
        type: String,
        required: false
    }

})

export default mongoose.model('Character', characterSchema);