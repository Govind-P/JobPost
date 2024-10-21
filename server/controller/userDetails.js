import recruiterModel from "../model/recruiter.js";
export const userDetails=async(req,res)=>{
    try{
        const {email}=req.decoded;
        const user=await recruiterModel.findOne({email:email});
        if(!user){
            throw new Error("User not found");
        }
        res.status(200).json({
            message: "User details fetched successfully",
            success: true,
            data:user
        });
    }catch(err){
        res.status(500).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}