import mongoose from "mongoose";

const user_schema=new mongoose.Schema({
    username:{String,
              require:true,
              validate:{
                    validator(username){
                            const validation= /^[a-zA-Z0-9_\-\.]+$/.test(username)
                        },
                    message: "Error: Invalid char used"
                    }
              },
            
    password:{String,
             require:true,
             validate:{
                validator(username){
                        const validation= /^[a-zA-Z0-9_\-\.]+$/.test(username)
                    },
                message: "Error: Invalid char used"
            }
        },
        
    comments:Object,
    

})

const User=mongoose.model('user',user_schema);

export default User;