import { UserRepository } from "../repository/userRepository";
import {DTOfetchUserByEmail} from "../services/userService";
import {Request, Response, NextFunction} from "express"
import Joi from "joi";

export class UserValidation{
    constructor(private userRepository:UserRepository){}

    validLoginUser(req:Request, res:Response, next:NextFunction){
        
        if(!req.body.username){return res.status(400).json({success:false, err:"username-not-set"});}
        else if(!req.body.password){return res.status(400).json({success:false, err:"password-not-set"});}

        const schemaLoginUser = Joi.object({
            username:Joi.string()
                .trim()
                .email()
                .lowercase()
                .min(3)
                .messages({
                    'string.trim':'email-contain-space',
                    'string.email': 'email-not-valid',
                    'string.empty': 'email-empty',
                    'string.min': 'email-min-not-reach',
                }),
            password:Joi.string()
                .empty()
                .messages({
                    'string.empty':'password-empty',
                })
        });
        
        let result = schemaLoginUser.validate(req.body);
        
        if(result.error){
            return res.status(400).json({success:false, err:result.error.details[0].message});
        }
        return next();
    }

    async validAddUser(req:Request, res:Response, next:NextFunction){
        const schemaUser = Joi.object({
            username:Joi.string()
                .trim()
                .email()
                .lowercase()
                .min(3)
                .required()
                .messages({
                    'string.email': 'email-not-valid',
                    'string.trim': 'email-contain-space',
                    'string.empty':'email-empty',
                    'string.min':'email-min-not-reach',
                    'string.lowercase':'email-not-lowercase',
                    'string.required':'email-is-required'
                }),
            password:Joi.string()
                .required()
                .alphanum()
                .min(5)
                .messages({
                    'string.required':'password-not-set',
                    'string.min':'password-min-not-reach',
                    'string.alphanum':'bad-typo-password'
                })
        });

        let result = schemaUser.validate(req.body);
        
        if(result.error){
            return res.status(400).json({success:false, err:result.error.details[0].message});
        }
        let dtoFetchUserByEmail:DTOfetchUserByEmail = {
            email:req.body.body.email
        }
        const [status, data] = await this.userRepository.fetchUserByEmail(dtoFetchUserByEmail);
        
        if(status.status === 200){
            return res.status(400).json({success:false, err:"user-already-exist"});
        }

        return next();
    }

    validActiveUser(req:Request, res:Response, next:NextFunction){
        if(!req.params.id){
            return res.status(400).json({success:false, err:"id-not-set"});
        }
        return next();
    }
}
