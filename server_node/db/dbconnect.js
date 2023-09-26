import 'dotenv/config';
import mongoose from "mongoose";

async function dbConnect(){
    console.log("Connessione al DB...");
    try{
        
        const DB_URI=process.env.DB_URI;
        await mongoose.connect(DB_URI,{ useNewUrlParser: true,
                                        useUnifiedTopology:true});
        console.log("Connesso al DB.");
    }
    catch(err){
        throw err;
    }
    
}

export default dbConnect;