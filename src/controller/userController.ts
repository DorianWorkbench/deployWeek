import {Request, Response} from "express";
import { UserService, DTOaddUser, DTOfetchUser } from "../services/userService";

export class UserController {
    
    constructor(private userService:UserService){}

    async addUser(req:Request, res:Response){
        let dtoAddUser:DTOaddUser = {
            username:req.body.username,
            password:req.body.password
        };
        const [ status, data ] = await this.userService.addUser(dtoAddUser);
        return res.status(status.status!).json(data);
    }
    async getAllUser(req: Request, res:Response) {
        const [status, data] = await this.userService.getUsers();
        return res.status(status.status!).json(data);
    }
    async getOneUser(req: Request, res:Response) {
        let dtoFetchUser:DTOfetchUser = {
            uuid:req.params.id
        };
        const [status, data] = await this.userService.getUserById(dtoFetchUser);
        return res.status(status.status!).json(data);
    }
}