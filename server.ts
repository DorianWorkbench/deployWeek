import express from "express";
import expressSession from "express-session";
import passport from "passport";
import {connect} from "./src/bdd/connect";
import cors from "cors";
import { UserRouteFactory } from "./src/routes/userRouteFactory";
import { UserService } from "./src/services/userService";
import { UserRepository } from "./src/repository/userRepository";
import {MailUtils} from "./src/utils/mailer";
import {PizzaService} from "./src/services/pizzaService";
import {PizzaRouteFactory} from "./src/routes/pizzaRouteFactory";
import { PizzaRepository } from "./src/repository/pizzaRepository";
import { UserValidation } from "./src/validation/userValidation";
import { PizzaValidation } from "./src/validation/pizzaValidation";

require('dotenv').config();

export const app = express();

export async function serverRun(){
    await connect();
    app.use(cors({
        origin:"*"
    }))
    app.use(expressSession({
         secret: process.env.SECRET!,
         resave:true,
         saveUninitialized:true,
        }));
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.json());
    
    app.use('/user', UserRouteFactory(new UserService(new UserRepository(), new MailUtils()), new UserValidation(new UserRepository())));
    app.use('/pizza', PizzaRouteFactory(new PizzaService(new PizzaRepository()), new PizzaValidation(new PizzaRepository())));

    return app;
}