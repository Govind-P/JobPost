import jobModel from "../model/job.js";
import { jobTemplate } from "../helper/template.js";
import sendMail from "../middleware/Email.config.js";

export const postJob=async (req,res)=>{
    try{
        const {id,company}=req.decoded;
        const {title, description, experience, candidates, endDate}=req.body;
        const job=new jobModel({title, description, experience, candidates, endDate, recruiter: id});
        const details=await job.save();
        const jobMailTemplate=jobTemplate(details,company);
        sendMail("Job Updates",candidates,title,jobMailTemplate);

        res.status(201).json({
            message: "Interview created and send to candidates successfully",
            data: details,
            success: true,
            error: false
        });

    }catch(err){
        res.status(500).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}