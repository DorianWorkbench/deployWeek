import { PizzaRepository } from "../repository/pizzaRepository";
import { Request, Response, NextFunction } from "express";
import { DTOgetOnePizza, DTOgetPizzaByName } from "../services/pizzaService";

export class PizzaValidation{
    constructor(private pizzaRepository:PizzaRepository){}
    
    async validAddPizz(req:Request, res:Response, next:NextFunction){
        if(!req.body.cost){return res.status(400).json({success:false, err:"cost-not-set"})}
        else if(!req.body.description){return res.status(400).json({success:false, err:"description-not-set"})}
        else if(!req.body.pizzaName){return res.status(400).json({success:false, err:"pizzaName-not-set"})}
        
        let dtoGetPizza:DTOgetPizzaByName = {
            pizzaName:req.body.pizzaName
        }
        let [status, data] =  await this.pizzaRepository.getPizzaByName(dtoGetPizza);
        
        if(status.status === 200){
            return res.status(400).json({success:false, err:"pizza-already-exist"});
        }
        
        return next();
    }
    async validDeletePizz(req:Request, res:Response, next:NextFunction){
        let dtoGetPizza:DTOgetOnePizza={
            id:req.params.id
        }
        const [status, data] = await this.pizzaRepository.getPizza(dtoGetPizza);

        if(status.status === 404){
            return res.status(status.status!).json(data);
        }

        return next();
    }
}