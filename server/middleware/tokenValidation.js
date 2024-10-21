import jwt from 'jsonwebtoken';

export const tokenValidation=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            throw new Error('User not Loggedin');
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET_LOGIN);
        req.decoded = decoded;
        next();
    }
    catch(error){
        res.status(401).json({error: true, message: error.message,success: false});
    }
}
