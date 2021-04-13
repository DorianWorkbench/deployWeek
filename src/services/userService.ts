import { UserRepository } from "../repository/userRepository";
import {hashPswd} from "../utils/bcrypt";
import {MailUtils} from "../utils/mailer";
import ejs from "ejs";
import path from "path";
import fs from "fs";

export type DTOaddUser={
    username:string,
    password:any
};
export type DTOfetchUser = {
    uuid:string
}
export class UserService{
    
    
    constructor(private userRepository:UserRepository, private mail:MailUtils){}

    async addUser(dtoAddUser:DTOaddUser){
        let pathN = path.join(__dirname, "../templateMail/verify.ejs");
        let template = ejs.compile(fs.readFileSync(pathN, "utf-8"));
        let html= template();
        dtoAddUser.password = await hashPswd(dtoAddUser.password);
        
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
}