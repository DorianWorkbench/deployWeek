import Router, {NextFunction, Request, Response}  from "express";
import passport from "../utils/passport";
import {UserController} from "../controller/userController";
import { UserService } from "../services/userService";
import { UserValidation } from "../validation/userValidation";

export function UserRouteFactory(userService:UserService, userValidation:UserValidation){
    const router = Router();
    const userController = new UserController(userService);

    router.post('/', (req:Request, res:Response, next:NextFunction)=>{
        userValidation.validAddUser(req, res, next)},
        (req:Request, res:Response)=>{
            userController.addUser(req,res)
        });
    router.get('/', (req:Request, res:Response)=>{
        userController.getAllUser(req, res);
    })
    router.get('/:id', (req:Request, res:Response)=>{
        userController.getOneUser(req, res);
    })
    router.post('/login',(req:Request, res:Response, next:NextFunction)=>{userValidation.validLoginUser(req, res, next)}, 
        passport.authenticate('local'), 
        function(req,res){
            res.status(200).json({success:true, result:req.user});
    })
    router.get('/active/:id', (req:Request, res:Response)=>{
        userController.activeUser(req,res);
    })
    return router;
}