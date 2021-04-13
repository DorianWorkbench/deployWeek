import passport from "passport";
import {Strategy as LocalStrategy}  from "passport-local";
import mongoose from "mongoose";
import { userScheme } from "../bdd/schema/userSchema";
import { compareHash } from "../utils/bcrypt";

export default passport.use('local', new LocalStrategy({
        usernameField:'email',
        passwordField:'passwd'
    },
    async function(username, password, done){
        const user = await userScheme.findOne({username:username})
            .catch((err:mongoose.Error)=>{
                console.log(err);
                console.log("global-error");
                done(err);
            });
        if(!user){
            console.log(username);
            return done(null, false);
        }
        if(await compareHash(password, user.password)){
            return done(null, user);
        }
    }
))