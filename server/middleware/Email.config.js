import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async(subject,to,text,htmlContent) =>{
    try{
        const info = await transporter.sendMail({
            from: `"Cuvette Project" <${process.env.MY_EMAIL}>`,
            to: to.join(","),
            subject: subject,
            text: text, 
            html: htmlContent, 
          });
    }
    catch(error){
        console.error(error);
    }
}

export default sendMail;
