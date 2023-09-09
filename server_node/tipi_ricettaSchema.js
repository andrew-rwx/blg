import mongoose from "mongoose";

const ricetta_schema=new mongoose.Schema({
    titolo:String,
    src:String,
    alt:String,
    testo:String
})

const Colazione=new mongoose.model("breakfast",ricetta_schema);
const Primi=new mongoose.model("fistplate",ricetta_schema);
const Secondi=new mongoose.model("secondplate",ricetta_schema);
const Contorni=new mongoose.model("sideplate",ricetta_schema);
const Dolci=new mongoose.model("sweet",ricetta_schema);
const Spuntini=new mongoose.model("snack",ricetta_schema);

export{Colazione,Primi,Secondi,Contorni,Dolci,Spuntini};
