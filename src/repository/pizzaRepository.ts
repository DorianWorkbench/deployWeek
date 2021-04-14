import { pizzaSchema } from "../bdd/schema/pizzaSchema";
import { DTOaddPizza, DTOgetOnePizza } from "../services/pizzaService";
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
    async getPizza(dtoGetPizza: DTOgetOnePizza){
        const result = pizzaSchema.findById(dtoGetPizza.id)
            .catch((err:mongoose.Error)=>{
                return [{status:500},{success:false, err:"global-error"}];
            });
        if(!result){
            return [{status:404}, {success:false, err:"pizza-not-found"}];
        }
        return [{status:200}, {success:true, result: result}];
    }
}