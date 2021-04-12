import mongoose from "mongoose";

export async function connect(){
    return await mongoose.connect(process.env.DB_HOST!, {useUnifiedTopology:true, useNewUrlParser:true});
}