import mongoose from "mongoose";

const User = new mongoose.Schema({
    username:String,
    password:String
});

export let userScheme = mongoose.model("User", User);