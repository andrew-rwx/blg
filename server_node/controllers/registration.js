
import bcrypt from "bcrypt"
import User from "../models/User.js"

async function registration(user_data){
const input_username=user_data.username;
const input_password=user_data.password;
const input_email=user_data.email;
const saltRounds=10;

if(input_password.length<8){
    throw new Error("La password deve contenere almeno 8 caratteri")
}

const user_found=await searchUserInDb(input_username);

if(user_found){
    throw new Error("Nome utente già utilizzato");
}
else{
    const hashed_psw=await bcrypt.hash(input_password,saltRounds);
    const user=new User({
        username:input_username,
        password:hashed_psw,
        comments:{}})

    await user.save();
}

return "Registrazione avvenuta con successo!"

}


async function searchUserInDb(input_username){
const user_found=await User.findOne({username: input_username});
return user_found;
}

export default registration;