import 'dotenv/config';
import mongoose from "mongoose";

async function dbConnect(){
    const DB_URI=process.env.DB_URI;
    await mongoose.connect(DB_URI,{ useNewUrlParser: true,
                                    useUnifiedTopology:true});
}

export default dbConnect;