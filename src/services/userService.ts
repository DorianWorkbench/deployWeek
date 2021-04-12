import { UserRepository } from "../repository/userRepository";

export type DTOaddUser={
    username:string,
    password:string
};
export type DTOfetchUser = {
    uuid:string
}
export class UserService{
    
    
    constructor(private userRepository:UserRepository){}
    async addUser(dtoAddUser:DTOaddUser){
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