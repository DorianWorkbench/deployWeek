import { UserRepository } from "../repository/userRepository";
import {Request, Response, NextFunction} from "express"
import Joi from "joi";

export class UserValidation{
    constructor(private userRepository:UserRepository){}

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
        return next();
    }
}
