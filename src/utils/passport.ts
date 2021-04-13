import passport from "passport";
import {Strategy as LocalStrategy}  from "passport-local";
import mongoose, { NativeError } from "mongoose";
import { userScheme } from "../bdd/schema/userSchema";
import { compareHash } from "../utils/bcrypt";


passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});
passport.deserializeUser((id, done) => {
    userScheme.findById(id, (err: NativeError, user:any) => {
        done(err, user.id);
    });
});
export default passport.use('local', new LocalStrategy({
        usernameField:'username',
        passwordField:'password'
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
        let validation = await compareHash(password.toString(), user.password);
        if(validation){
            return done(null, user);
        }else{
            done(null, "mauvais identifiant");
        }
    }
))