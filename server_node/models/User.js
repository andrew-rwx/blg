import mongoose from "mongoose";

const user_schema=new mongoose.Schema({
    username:{  type:String,
                required:true,
                
    },
            
    password:{  type:String,
                required:true
    },

    email:{ type:String,
            required:true,
    },
        
    comments:{ type:[Object]}
    
})

const User=mongoose.model('user',user_schema);

export default User;