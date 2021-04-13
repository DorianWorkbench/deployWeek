import {DTOactiveUser, DTOaddUser, DTOfetchUser} from "../services/userService";
import {userScheme} from "../bdd/schema/userSchema";
import mongoose from "mongoose";

export class UserRepository{
    constructor(){}
    async insertUser(dtoAddUser:DTOaddUser){
        let user = new userScheme();

        user.username = dtoAddUser.username;
        user.password = dtoAddUser.password;
        user.token = dtoAddUser.token;

        const result = await user.save().catch((err:mongoose.Error)=>{
            return [{status:500}, {success:false, err:err}];
        });
        if(!result){
            return [{status:400}, {success:false, err:"create-user-error"}];
        }

        return [{status:201}, {success:true, result}];
    }
    async fetchAllUser(){
        const result = await userScheme.find().catch((err:mongoose.Error)=>{
            return [{status:500}, {success:false, err:"global-error"}];
        })
        if(!result){
            return [{status: 404}, {success:true, result:"users-not-found"}];
        }
        return  [{status:200},{success:true, result:result}];
    }
    async fetchUserById(dtoFetchUser:DTOfetchUser){
        const result = await userScheme.findOne({_id:dtoFetchUser.uuid})
            .catch((err:mongoose.Error)=>{
                return [{status:500}, {success:false, err:"global-error"}];
            });
        return [{status:200}, {success:true, result:result}];
    }
    async activeUser(dtoActiveUser:DTOactiveUser){
        const result = await userScheme.findOneAndUpdate({token:dtoActiveUser.uuid}, {active:true}, {new:true, useFindAndModify:false })
            .catch((err:mongoose.Error)=>{
                return [{status:500}, {success:false, err:"global-error"}];
            });
        if(!result){
            return [{status:404},{success:false, err:"user-relative-token-not-found"}];
        }
        return [{status:204}, {success:true, result:result}];
    }
}