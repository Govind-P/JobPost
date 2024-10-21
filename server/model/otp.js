import mongoose from "mongoose";

const otpSchema=mongoose.Schema({
    otp: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6
    },
    to:{
        type:String,
        required: true,
    },
    expiresIn: {
        type: Date,
        required: true
    }
},{timestamps:true});

const otpModel=mongoose.model('otp',otpSchema);

export default otpModel;