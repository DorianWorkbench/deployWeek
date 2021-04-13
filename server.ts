import express from "express";
import expressSession from "express-session";

import passport from "passport";
import {connect} from "./src/bdd/connect";

require('dotenv').config();

export const app = express();

export async function serverRun(){
    await connect(); 
    app.use(expressSession({
         secret: process.env.SECRET!,
         resave:true,
         saveUninitialized:true,
        }));
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.json());
    app.listen(process.env.PORT, ()=>{
        console.log("SERVER ON "+process.env.PORT);
    });
}
