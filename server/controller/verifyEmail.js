import otpModel from "../model/otp.js";
import recruiterModel from "../model/recruiter.js";

export const verifyEmail=async (req,res)=>{
    try{
        const {email}=req.decoded;
        const {otpEmail}=req.body;
        const exist=await otpModel.findOne({to: email});
        if(exist){
            if(exist.expiresIn<Date.now()){
                await exist.deleteOne();
                throw new Error('OTP expired! Please request for a new OTP.');
            }
            if(exist.otp===otpEmail){
                await exist.deleteOne();
                const update = await recruiterModel.findOneAndUpdate(
                    { email: email },
                    { emailVerified: true },
                    { new: true }
                );
                res.status(200).json({
                    message: 'Email verified successfully',
                    data: update.emailVerified,
                    success: true,
                    error: false
                });
                return;
            }
            else{
                throw new Error('Incorrect OTP');
            }
        }
        else{
            throw new Error('Request for OTP');
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}