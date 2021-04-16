import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  active: { type: Boolean, default: false },
});

export let userScheme = mongoose.model("User", User);
