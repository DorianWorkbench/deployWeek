import { PizzaService } from "../services/pizzaService";
import Router, {Request, Response} from "express";
import {PizzaController} from "../controller/pizzaController";

export function PizzaRouteFactory(pizzaService:PizzaService){
    let router = Router();
    let pizzaController:PizzaController = new PizzaController(pizzaService);
    
    router.post('/', (req:Request, res:Response)=>{
        pizzaController.addingPizza(req,res);
    })
    router.get('/:id', (req:Request, res:Response)=>{
        pizzaController.fetchOnePizz(req,res);
    })
    router.get('/', (req:Request, res:Response)=>{
        pizzaController.fetchAllPizza(req,res);
    })
    router.delete('/:id', (req:Request, res:Response)=>{
        pizzaController.deletePizza(req,res);
    })
    
    return router;
}