import mongoose from "mongoose";

export async function connect(){
    if(process.env.NODE_ENV === "test"){
        console.log("tesssst");
    }else{
        return await mongoose.connect(process.env.DB_TEST!, {useUnifiedTopology:true, useNewUrlParser:true});
    }
}