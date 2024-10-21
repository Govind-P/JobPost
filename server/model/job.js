import mongoose from 'mongoose';

const jobSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    candidates:{
        type:[String],
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    recruiter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    active:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

const jobModel = mongoose.model('Job',jobSchema);

export default jobModel;