import mongoose from "mongoose";

const pizza = new mongoose.Schema({
  pizzaName: String,
  cost: Number,
  description: String,
});

export let pizzaSchema = mongoose.model("Pizza", pizza);
