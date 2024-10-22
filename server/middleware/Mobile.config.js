import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const sendMobile = async (otp) => {
    try {
        const info=await client.messages.create({
            body: `Your OTP is ${otp}. It expires in 10 minutes.`,
            messagingServiceSid: process.env.TWILIO_SERVICESID,
            to: "+917025921551"
        });
    } catch (error) {
        console.log(error);
    }
}