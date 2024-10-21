import recruiterModel from "../model/recruiter.js";
import jwt from 'jsonwebtoken';

export const proceedDashboard=async(req,res) => {
    try {
        const { email,mobile } = req.decoded;
        const user = await recruiterModel.findOne({ email:email });
        if (!user) {
            throw new Error("User not found");
        }
        if(user.emailVerified && user.mobileVerified) {
            Object.assign(user, {accountStatus: 'Activated'});
            user.save();
            res.clearCookie("tokenD");
            const tokenData={
                mobile:mobile,
                email:email,
                id:user._id,
                company:user.company
            };
            const token =await jwt.sign(tokenData,process.env.JWT_SECRET_LOGIN);
            const tokenOption={
                httpOnly: true,
                secure:true,
                sameSite: 'None'
            }; 
            res.cookie("token",token,tokenOption).status(200).json({
                data:token,
                message : 'Welcome to dashboard',
                success:true,
                error:false
            });
        }
        else{
            throw new Error('Verification pending');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
 
};