import mongoose from "mongoose";
const comments_schema=new mongoose.Schema({
    recepie_id: String,
    comments: [Object]
})

const RecComment=mongoose.model('rec_comment',comments_schema);

export default RecComment; //recepie comment