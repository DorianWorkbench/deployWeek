import { app } from "./server";
import { serverRun } from "./server";
import { UserRouteFactory } from "./src/routes/userRouteFactory";
import { UserService } from "./src/services/userService";
import { UserRepository } from "./src/repository/userRepository";

async function init(){
    await serverRun();
    app.use('/user', UserRouteFactory(new UserService(new UserRepository())))
}
init();  