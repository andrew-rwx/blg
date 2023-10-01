import mongoose from "mongoose";
const comments_schema=new mongoose.Schema({
    id_ricetta: String,
    comments: [Object]
})

const RecComment=mongoose.model('rec_comment',comments_schema);

export default RecComment; //recepie comment