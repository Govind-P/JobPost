import recruiterModel from "../model/recruiter.js";
import otpModel from "../model/otp.js";
import sendMail from "../middleware/Email.config.js";
import { sendMobile } from "../middleware/Mobile.config.js";
import { otpTemplate } from "../helper/template.js";
import jwt from 'jsonwebtoken';

export const loginEmail = async(req, res) => {
    try{
        const { email,count} = req.body;
        if(count==1){
            const user=await recruiterModel.findOne({ email: email });
            if(!user){
                throw new Error("User not found");
            }
            //handle if email and mobile is not verified
            if(!user.emailVerified || !user.mobileVerified){
                throw new Error("Email and mobile verification is required");
            }
        }
        //otp send
        const otpemail = String(Math.floor(100000 + Math.random() * 900000));
        const expirationTime = Date.now() + 10 * 60 * 1000;

        //otp mail template
        const otpMailTemplate=otpTemplate(otpemail);
        sendMail("Email verification",[email],otpemail,otpMailTemplate);

        const otpExist=await otpModel.findOne({ to: email});
        if(otpExist){
            await otpExist.deleteOne();
        }
        const newotpEmail = new otpModel({otp: otpemail,to:email,expiresIn:expirationTime});
        await newotpEmail.save();

        res.status(200).json({
            message:"OTP send to email",
            success:true,
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: err.message,
            success: false,
            error: true
        });
    }

};


export const loginOtpEmail = async(req, res) => {
    try{
        const { email,otp} = req.body;
        const user=await recruiterModel.findOne({ email: email });
        if(!user){
            throw new Error("User not found");
        }
        //handle if email and mobile is not verified
        if(!user.emailVerified || !user.mobileVerified){
            throw new Error("Email and mobile verification is required");
        }

        const exist=await otpModel.findOne({to: email});
        if(exist){
            if(exist.expiresIn<Date.now()){
                await exist.deleteOne();
                throw new Error('OTP expired! Please request for a new OTP.');
            }
            if(exist.otp===otp){
                await exist.deleteOne();
                const tokenOption={
                    httpOnly: true,
                    secure:true,
                    sameSite: 'None'
                }; 
                const tokenData={
                    mobile:user.mobile,
                    email:user.email,
                    id:user._id,
                    company:user.company
                };
                const token =await jwt.sign(tokenData,process.env.JWT_SECRET_LOGIN);
                res.cookie("token",token,tokenOption).status(200).json({
                    data:token,
                    user:user,
                    message : 'Logged in successfully',
                    success:true,
                    error:false
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
    }catch(err){
        res.status(500).json({
            message: err.message,
            success: false,
            error: true
        });
    }

};


export const loginMobile = async(req, res) => {
    try{
        const { mobile,count} = req.body;
        if( count==1){
            const user=await recruiterModel.findOne({ mobile: mobile });
            if(!user){
                throw new Error("User not found");
            }
            //handle if email and mobile is not verified
            if(!user.emailVerified || !user.mobileVerified){
                throw new Error("Email and mobile verification is required");
            }
        }
        
        //otp send
        const otpmobile = String(Math.floor(100000 + Math.random() * 900000));
        const expirationTime = Date.now() + 10 * 60 * 1000;

        //otp mobile
        sendMobile(otpmobile);

        const otpExist=await otpModel.findOne({ to: mobile});
        if(otpExist){
            await otpExist.deleteOne();
        }
        const newotpMobile = new otpModel({otp: otpmobile,to:mobile,expiresIn:expirationTime});
        await newotpMobile.save();

        res.status(200).json({
            message:"OTP send to mobile successfully",
            success:true,
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: err.message,
            success: false,
            error: true
        });
    }

};


export const loginOtpMobile = async(req, res) => {
    try{
        const { mobile,otp} = req.body;
        const user=await recruiterModel.findOne({ mobile: mobile});
        if(!user){
            throw new Error("User not found");
        }
        //handle if email and mobile is not verified
        if(!user.emailVerified || !user.mobileVerified){
            throw new Error("Email and mobile verification is required");
        }

        const exist=await otpModel.findOne({to:mobile});
        if(exist){
            if(exist.expiresIn<Date.now()){
                await exist.deleteOne();
                throw new Error('OTP expired! Please request for a new OTP.');
            }
            if(exist.otp===otp){
                await exist.deleteOne();
                const tokenOption={
                    httpOnly: true,
                    secure:true,
                    sameSite: 'None'
                }; 
                const tokenData={
                    mobile:user.mobile,
                    email:user.email,
                    id:user._id,
                    company:user.company
                };
                const token =await jwt.sign(tokenData,process.env.JWT_SECRET_LOGIN);
                res.cookie("token",token,tokenOption).status(200).json({
                    data:token,
                    user:user,
                    message : 'Logged in successfully',
                    success:true,
                    error:false
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
    }catch(err){
        res.status(500).json({
            message: err.message,
            success: false,
            error: true
    });
    }

};


