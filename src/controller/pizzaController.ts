import { PizzaService } from "../services/pizzaService";
import {Request, Response} from "express";
import {DTOaddPizza} from "../services/pizzaService";

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
}