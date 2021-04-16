import { UserRepository } from "../repository/userRepository";
import { DTOfetchUserByEmail } from "../services/userService";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export class UserValidation {
  constructor(private userRepository: UserRepository) {}

  validLoginUser(req: Request, res: Response, next: NextFunction) {
    if (!req.body.username) {
      return res.status(400).json({ success: false, err: "email-not-set" });
    } else if (!req.body.password) {
      return res.status(400).json({ success: false, err: "password-not-set" });
    }

    const schemaLoginUser = Joi.object({
      username: Joi.string().email().lowercase().min(3).messages({
        "string.email": "email-not-valid",
        "string.min": "email-min-not-reach",
      }),
      password: Joi.string(),
    });

    let result = schemaLoginUser.validate(req.body);

    if (result.error) {
      return res
        .status(400)
        .json({ success: false, err: result.error.details[0].message });
    }
    return next();
  }

  async validAddUser(req: Request, res: Response, next: NextFunction) {
    if (!req.body.username) {
      return res.status(400).json({ success: false, err: "email-not-set" });
    } else if (!req.body.password) {
      return res.status(400).json({ success: false, err: "password-not-set" });
    }

    req.body.username.trim();
    req.body.username.toLowerCase();

    const schemaUser = Joi.object({
      username: Joi.string().email().messages({
        "string.email": "email-not-valid",
      }),
      password: Joi.string().min(5).messages({
        "string.min": "password-min-not-reach",
      }),
    });
    let result = schemaUser.validate(req.body);

    if (result.error) {
      return res
        .status(400)
        .json({ success: false, err: result.error.details[0].message });
    }
    let dtoFetchUserByEmail: DTOfetchUserByEmail = {
      email: req.body.username,
    };
    const [status, data] = await this.userRepository.fetchUserByEmail(
      dtoFetchUserByEmail
    );
    console.log(status);
    if (status.status === 200) {
      return res
        .status(400)
        .json({ success: false, err: "user-already-exist" });
    }
    console.log(2);
    return next();
  }

  validActiveUser(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return res.status(400).json({ success: false, err: "id-not-set" });
    }
    return next();
  }
}
