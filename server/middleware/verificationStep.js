import jwt from 'jsonwebtoken';

export const verifyToken=async(req,res,next)=>{
    try{
        const token=req.cookies.tokenD;
        if(!token){
            throw new Error('User not Loggedin');
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = decoded;
        next();
    }
    catch(error){
        res.status(401).json({error: 'Token is not valid'});
    }
}