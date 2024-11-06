import mongoose, { mongo } from "mongoose";

const TaskSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    important:{
        type:Boolean,
        default:false
    },
    inComplete:{
        type:Boolean,
        default:false
    },
    Completed:{
        type:Boolean,
        default:false
    }
});


export const Task =  mongoose.model("task",TaskSchema);