import CustomError from "../utils/CustomError.js";

async function error_handler(error,req,res,next){
        console.log("Nel middleware");
        if (error instanceof CustomError) {
            const status_code=error.status;
            res.status(status_code).json({message:error.message})
        }
        else{
            const error_response={
                status:'500',
                message:'Oops,qualcosa non ha funzionato!'
            };
            await fetch('http://localhost:3000/api/error',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(error_response)
            });
            
        }
   
    }



export default error_handler;