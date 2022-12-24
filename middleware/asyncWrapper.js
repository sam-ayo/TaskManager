// Avoid using try catch in controller during I/O with db
const asyncWrapper = (fn) => {
    return async(req,res,next)=>{
        try {
            await fn(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = asyncWrapper;