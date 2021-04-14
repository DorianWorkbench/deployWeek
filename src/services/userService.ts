import { UserRepository } from "../repository/userRepository";
import {hashPswd} from "../utils/bcrypt";
import {MailUtils} from "../utils/mailer";
import {v4 as uuidv4} from "uuid";
import ejs from "ejs";
import path from "path";
import fs from "fs";

export type DTOaddUser={
    username:string;
    password:any;
    token?:string;
};
export type DTOfetchUser = {
    uuid:string;
}
export type DTOactiveUser={
    uuid:string;
}

export type DTOfetchUserByEmail={
    email:string;
}
export class UserService{
    
    
    constructor(private userRepository:UserRepository, private mail:MailUtils){}

    async addUser(dtoAddUser:DTOaddUser){
        let uuid:string = uuidv4();
        let pathN = path.join(__dirname, "../templateMail/verify.ejs");
        let template = ejs.compile(fs.readFileSync(pathN, "utf-8"));
        let html= template({activeLink:process.env.ACTIVE+uuid});
        
        dtoAddUser.password = await hashPswd(dtoAddUser.password);
        dtoAddUser.token = uuid;
        
        this.mail.sendingMail(dtoAddUser.username, html);
        
        const [status, data] = await this.userRepository.insertUser(dtoAddUser);
        return [{status:status.status}, data];
    }
    
    async getUsers(){
        const [status, data] = await this.userRepository.fetchAllUser();
        return [{status:status.status}, data];
    }

    async getUserById(dtoFetchUser:DTOfetchUser){
        const [status, data] = await this.userRepository.fetchUserById(dtoFetchUser);
        return [{status:status.status}, data];
    }
    
    async activeUser(dtoActiveUser:DTOactiveUser){
        const [status, data] = await this.userRepository.activeUser(dtoActiveUser);
        return [{status:status.status},data];
    }
}