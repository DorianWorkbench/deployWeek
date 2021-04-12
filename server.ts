import express from "express";
import {connect} from "./src/bdd/connect";

require('dotenv').config();

export const app = express();

export async function serverRun(){
    await connect();

    app.use(express.json());
    app.listen(process.env.PORT, ()=>{
        console.log("SERVER ON "+process.env.PORT);
    });
}
