const { CustomError } = require("../errors/custom-error");

const errorHandler = (err,req,res,next)=>{
    if(err instanceof CustomError){
        return res.status(err.status).json(err.message);
    }
    return res.status(500).json({msg:"Something went wrong. Try again"});
}

module.exports = errorHandler;