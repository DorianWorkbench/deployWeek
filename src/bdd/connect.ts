import mongoose from "mongoose";

export async function connect(){
    console.log(process.env.DB_TEST);
    return await mongoose.connect(process.env.DB_TEST!, {useUnifiedTopology:true, useNewUrlParser:true});
}