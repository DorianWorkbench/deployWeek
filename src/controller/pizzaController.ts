import { PizzaService, DTOaddPizza, DTOgetOnePizza } from "../services/pizzaService";
import {Request, Response} from "express";

export class PizzaController{
    
    constructor(private pizzaService:PizzaService){}
    
    async addingPizza(req:Request, res:Response){
        let dtoAddPizza:DTOaddPizza = {
            cost:req.body.cost,
            description:req.body.description,
            pizzaName:req.body.pizzaName
        }
        const [status, data] = await this.pizzaService.addingPizza(dtoAddPizza);

        return res.status(status.status!).json(data);
    }
    async fetchOnePizz(req:Request, res:Response){
        console.log("req.params.id");
        console.log(req.params.id);
        let dtoGetPizz:DTOgetOnePizza = {
            id:req.params.id
        }
        const [status, data] = await this.pizzaService.getOnePizza(dtoGetPizz);
        return res.status(status.status!).json(data);
    }

    async fetchAllUser(req: Request, res: Response) {
        const [status, data] = await this.pizzaService.getAllPizza();
        return res.status(status.status!).json(data);
    }
}