import { Request, Response } from "express";
import {
  UserService,
  DTOaddUser,
  DTOfetchUser,
  DTOactiveUser,
} from "../services/userService";

export class UserController {
  constructor(private userService: UserService) {}

  async addUser(req: Request, res: Response) {
    console.log("3");
    let dtoAddUser: DTOaddUser = {
      username: req.body.username,
      password: req.body.password,
    };
    const [status, data] = await this.userService.addUser(dtoAddUser);
    console.log("7");
    return res.status(status.status!).json(data);
  }
  async getAllUser(req: Request, res: Response) {
    const [status, data] = await this.userService.getUsers();
    return res.status(status.status!).json(data);
  }
  async getOneUser(req: Request, res: Response) {
    let dtoFetchUser: DTOfetchUser = {
      uuid: req.params.id,
    };
    const [status, data] = await this.userService.getUserById(dtoFetchUser);
    return res.status(status.status!).json(data);
  }
  async activeUser(req: Request, res: Response) {
    let dtoActiveUser: DTOactiveUser = {
      uuid: req.params.id,
    };
    const [status, data] = await this.userService.activeUser(dtoActiveUser);
    return res.status(status.status!).json(data);
  }
}
