import otpModel from "../model/otp.js";
import recruiterModel from "../model/recruiter.js";

export const verifyMobile=async (req,res)=>{
    try{
        const {mobile}=req.decoded;
        const {otpMobile}=req.body;
        const exist=await otpModel.findOne({to: mobile});
        if(exist){
            if(exist.expiresIn<Date.now()){
                await exist.deleteOne();
                throw new Error('OTP expired! Please request for a new OTP.');
            }
            if(exist.otp===otpMobile){
                await exist.deleteOne();
                const update = await recruiterModel.findOneAndUpdate(
                    { mobile: mobile },
                    { mobileVerified: true },
                    { new: true }
                );
                res.status(200).json({
                    message: 'Mobile verified successfully',
                    data: update.mobileVerified,
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
        res.status(500).json({
            message: error.message,
            error:true,
            success: false
        });
    }
}