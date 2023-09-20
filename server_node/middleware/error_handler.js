import 'dotenv/config';
import CustomError from '../utils/CustomError.js';
const PORT=process.env.PORT_BACK;

async function error_handler(error,req,res,next){
        console.log("Nel middleware");
        if (error instanceof CustomError) { //TODO
            const status_code=error.status;
            res.status(status_code).json({message:error.message})
        }
        else{
            const error_response={
                status:'500',
                message:'Oops,qualcosa non ha funzionato!'
            };
            await fetch(`http://localhost:${PORT}/api/error`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(error_response)
            });
            
        }
   
    }



export default error_handler;