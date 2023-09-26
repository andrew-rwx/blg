import mongoose from "mongoose";

const user_schema=new mongoose.Schema({
    username:{  type:String,
                required:true,
                validate:{
                        validator:function(username){
                               return  /^[a-zA-Z0-9_\-\.]+$/.test(username)
                            },
                        message: "Invalid char used"
                }
    },
            
    password:{  type:String,
                required:true
    },

    email:{ type:String,
            required:true,
            validate:{
                validator:function(email){
                    return /^[a-zA-Z0-9_\-\.]+\@[a-z]+\.[a-z]+$/.test(email)
                },
                message: "Invalid email format"
            }
    },
        
    comments:{  type:Object}
    
})

const User=mongoose.model('user',user_schema);

export default User;