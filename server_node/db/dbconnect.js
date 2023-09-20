import 'dotenv/config';
import mongoose from "mongoose";

async function dbConnect(){
    try{
        const DB_URI=process.env.DB_URI;
        await mongoose.connect(DB_URI,{ useNewUrlParser: true,
                                        useUnifiedTopology:true});
    }
    catch(err){
        throw err;
    }
    
}

export default dbConnect;