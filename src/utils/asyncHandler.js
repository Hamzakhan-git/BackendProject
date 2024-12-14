//FOR PROMISSES
const asyncHandler =() =>{
    (req,res,next) => {
        Promise.resolve(requestHandler).catch((err) => next(err)).
        catch((err) =>next(err))
    }
}

export {asyncHandler}

//FOR TRY & CATCH
/*const asyncHandler = (fn) => async(req,res,next) => {
    try{
        await fn(req,res,next)
    } catch(error){
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}*/