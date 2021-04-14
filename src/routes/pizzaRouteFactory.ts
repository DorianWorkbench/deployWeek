import { PizzaService } from "../services/pizzaService";
import Router, {Request, Response, NextFunction} from "express";
import {PizzaController} from "../controller/pizzaController";
import { PizzaValidation } from "../validation/pizzaValidation";

export function PizzaRouteFactory(pizzaService:PizzaService, pizzaValidation:PizzaValidation){
    let router = Router();
    let pizzaController:PizzaController = new PizzaController(pizzaService);
    
    router.post('/', (req:Request, res:Response, next:NextFunction)=>{
        pizzaValidation.validAddPizz(req,res,next)},
        (req:Request, res:Response)=>{
            pizzaController.addingPizza(req,res);}
    )
    router.get('/:id', (req:Request, res:Response)=>{
        pizzaController.fetchOnePizz(req,res);
    })
    router.get('/', (req:Request, res:Response)=>{
        pizzaController.fetchAllPizza(req,res);
    })
    router.delete('/:id', (req:Request, res:Response)=>{
        pizzaController.deletePizza(req,res);
    })
    
    router.put('/:id', (req:Request, res:Response)=>{
        pizzaController.updatePizza(req,res);
    })
    
    return router;
}