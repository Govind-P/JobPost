import jwt from 'jsonwebtoken';
import  recruiterModel from '../model/recruiter.js';
import otpModel from '../model/otp.js';
import sendMail from '../middleware/Email.config.js';
import {otpTemplate} from '../helper/template.js';
import { sendMobile } from '../middleware/Mobile.config.js';



const signUp=async(req,res)=>{
    try{
        const {name,mobile,company,email,employee_count}=req.body;
        const newEmail=email.toLowerCase();
        const existingUser=await recruiterModel.findOne( {$or: [
            { email: newEmail },
            { mobile: mobile }
          ]});
        if(existingUser){
            throw new Error('User already exists with this email or phone number.');
        }
        const recruiter=new recruiterModel({name,mobile,company,email,employee_count});
        const valid=await recruiter.save();

        const tokenData={
            mobile:mobile,
            email:newEmail,
        };
        const tokenD =await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn: 60*60*1});

        //otp send
        const otpemail = String(Math.floor(100000 + Math.random() * 900000));
        const otpmobile=String(Math.floor(100000 + Math.random() * 900000));
        const expirationTime = Date.now() + 10 * 60 * 1000;

        //otp mail template
        const otpMailTemplate=otpTemplate(otpemail);
        sendMail("Email verification",[newEmail],otpemail,otpMailTemplate);

        //otp send mobile
        sendMobile(otpmobile);

        //otp save
        const newotpEmail = new otpModel({otp: otpemail,to:newEmail,expiresIn:expirationTime});
        await newotpEmail.save();
        const newotpMobile = new otpModel({otp: otpmobile,to:mobile,expiresIn:expirationTime});
        await newotpMobile.save();


        const tokenOption={
            httpOnly: true,
            secure:true,
            sameSite: 'None'
        };         
        res.cookie("tokenD",tokenD,tokenOption).status(200).json({
            data:tokenD,
            message : 'Proceed to verification',
            success:true,
            error:false
        });
    }

    catch(error){
        res.status(500).json({
            message: error.message,
            error:true,
            success:false
        });
    }

};


export default signUp;