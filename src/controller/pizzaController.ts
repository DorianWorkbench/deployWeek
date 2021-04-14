import { PizzaService, DTOaddPizza, DTOgetOnePizza, DTOdeleteOnePizza, DTOupdatePizza } from "../services/pizzaService";
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
        let dtoGetPizz:DTOgetOnePizza = {
            id:req.params.id
        }
        const [status, data] = await this.pizzaService.getOnePizza(dtoGetPizz);
        return res.status(status.status!).json(data);
    }

    async fetchAllPizza(req: Request, res: Response) {
        const [status, data] = await this.pizzaService.getAllPizza();
        return res.status(status.status!).json(data);
    }
    
    async deletePizza(req: Request, res: Response) {
        let dtoDeleteOnepizza:DTOdeleteOnePizza={
            id:req.params.id
        }
        const [status, data] = await this.pizzaService.supressPizza(dtoDeleteOnepizza);
        return res.status(status.status!).json(data);
    }

    async updatePizza(req: Request, res: Response) {
        let dtoUpdatePizza:DTOupdatePizza={
            id:req.params.id,
            pizzaName:req.body.pizzaName,
            cost:req.body.cost,
            description:req.body.description
        }
        const [status, data] = await this.pizzaService.updateOnePizza(dtoUpdatePizza);
        return res.status(status.status!).json(data);
    }
}