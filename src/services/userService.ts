import { UserRepository } from "../repository/userRepository";
import {hashPswd} from "../utils/bcrypt";
export type DTOaddUser={
    username:string,
    password:any
};
export type DTOfetchUser = {
    uuid:string
}
export class UserService{
    
    
    constructor(private userRepository:UserRepository){}
    async addUser(dtoAddUser:DTOaddUser){
        dtoAddUser.password = await hashPswd(dtoAddUser.password);
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