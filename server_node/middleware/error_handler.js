function error_handler(error,req,res,next){
    const status_code=error.status || 500;
    res.status(status_code).json({err:error.message})
    
}

export default error_handler;