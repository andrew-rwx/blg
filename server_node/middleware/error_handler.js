import 'dotenv/config';
import CustomError from '../utils/CustomError.js';
const PORT=process.env.PORT_BACK;

async function error_handler(error,req,res,next){
        console.log("ciao")

        if (error instanceof CustomError) { //TODO
            const status_code=error.status;
            res.status(status_code).json({message:error.message})
        }
        else{
            
                console.log("trigghered");
                const error_response={
                    status:'500',
                    message:'Ooops,qualcosa è andato storto!'
                };
                res.status(500).json(error_response);
            }
      
            
        }
   
    



export default error_handler;