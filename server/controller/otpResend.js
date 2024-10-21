export const resendEmail=async(req, res)=>{
    try{
        
    }
    catch(error){
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
}