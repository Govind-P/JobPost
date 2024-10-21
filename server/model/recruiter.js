import mongoose from 'mongoose';

const recruiterSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    company:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    employee_count:{
        type:Number,
        required:true
    },
    emailVerified:{
        type:Boolean,
        default:false
    },
    mobileVerified:{
        type:Boolean,
        default:false
    },
    accountStatus:{
        type:String,
        default:'inactive'
    },
    
},{timestamps:true});

const recruiterModel=mongoose.model('Recruiter',recruiterSchema);

export default recruiterModel;