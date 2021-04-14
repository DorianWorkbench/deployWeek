import { app } from "./server";
import { serverRun } from "./server";
import { UserRouteFactory } from "./src/routes/userRouteFactory";
import { UserService } from "./src/services/userService";
import { UserRepository } from "./src/repository/userRepository";
import {MailUtils} from "./src/utils/mailer";
import {PizzaService} from "./src/services/pizzaService";
import {PizzaRouteFactory} from "./src/routes/pizzaRouteFactory";
import { PizzaRepository } from "./src/repository/pizzaRepository";
import { UserValidation } from "./src/validation/userValidation";

async function init(){
    await serverRun();
    app.use('/user', UserRouteFactory(new UserService(new UserRepository(), new MailUtils()), new UserValidation(new UserRepository())));
    app.use('/pizza', PizzaRouteFactory(new PizzaService(new PizzaRepository())));
}
init();