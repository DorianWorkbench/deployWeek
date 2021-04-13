import Router, {Request, Response}  from "express";
import passport from "../utils/passport";
import {UserController} from "../controller/userController";
import { UserService } from "../services/userService";

export function UserRouteFactory(userService:UserService){
    const router = Router();
    const userController = new UserController(userService);

    router.post('/', (req:Request, res:Response)=>{
        userController.addUser(req,res)
    });
    router.get('/', (req:Request, res:Response)=>{
        userController.getAllUser(req, res);
    })
    router.get('/:id', (req:Request, res:Response)=>{
        userController.getOneUser(req, res);
    })
    router.post('/login', passport.authenticate('local'), function(req,res){
        console.log("test route")
        res.status(200).json({success:true, result:req.user});
    })
    return router;
}