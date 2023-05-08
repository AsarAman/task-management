import mongoose from "mongoose";
import User from "./User.js";

const TodoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a name for todo'],
        minlength:5,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:User,
        required:[true,'Please provide User']
    }
},
{timestamps:true}

)

export default mongoose.model('Todos', TodoSchema)