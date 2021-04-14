import { pizzaSchema } from "../bdd/schema/pizzaSchema";
import { DTOaddPizza } from "../services/pizzaService";
import mongoose from "mongoose";
export class PizzaRepository{
    constructor(){}

    async insertPizza(dtoAddPizza:DTOaddPizza){
        const pizza = new pizzaSchema();

        pizza.pizzaName = dtoAddPizza.pizzaName;
        pizza.cost = dtoAddPizza.cost;
        pizza.description = dtoAddPizza.description;

        let result = await pizza.save()
            .catch((err:mongoose.Error)=>{
                return [{status:500}, {success:true, err:"global-error"}];
            });
        
        return [{status:201},{success:true, result:result}];
    }
}