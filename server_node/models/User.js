import mongoose from "mongoose";

const user_schema=new mongoose.Schema({
    username:{  type:String,
                required:true,
                validate:{
                        validator:function(username){
                                const validation= /^[a-zA-Z0-9_\-\.]+$/.test(username)
                            },
                        message: "Error: Invalid char used"
                }
    },
            
    password:{  type:String,
                required:true,
                validate:{
                    validator:function(password){
                        const validation= /^[a-zA-Z0-9_\-\.]+$/.test(password)
                    },
                    message: Error
                }
    },

    email:{  type:String,
        required:true,
        validate:{
            validator:function(email){
                const validation= /^[a-zA-Z0-9_\-\.]+\@[a-z]+\.[a-z]+$/.test(username)
            },
            message: "Error: Invalid user format"
        }
    },
        
    comments:{  type:Object
    }
    

})

const User=mongoose.model('user',user_schema);

export default User;