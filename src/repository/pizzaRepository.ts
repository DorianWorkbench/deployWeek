import { pizzaSchema } from "../bdd/schema/pizzaSchema";
import { DTOaddPizza, DTOdeleteOnePizza, DTOgetOnePizza, DTOgetPizzaByName, DTOupdatePizza } from "../services/pizzaService";
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
        const result = await pizzaSchema.findById(dtoGetPizza.id)
            .catch((err:mongoose.Error)=>{
                return [{status:500},{success:false, err:"global-error"}];
            });
        if(!result){
            return [{status:404}, {success:false, err:"pizza-not-found"}];
        }
        return [{status:200}, {success:true, result: result}];
    }
    async getPizzaByName(dtoGetPizzaByName:DTOgetPizzaByName){
        const result = await pizzaSchema.findOne({pizzaName:dtoGetPizzaByName.pizzaName})
            .catch((err:mongoose.Error)=>{
                return [{status:500}, {success:false, err:"global-error"}];
            });
        if(!result){
            return [{status:404}, {success:false, err:"pizza-not-found"}];
        }
        return [{status:200}, {success:true, result:result}];
    }
    async getPizzas(){
        let result = await pizzaSchema.find()
            .catch((err:mongoose.Error)=>{
                return [{status:500},{success:false, err:"global-error"}];
            });
        
        if(!result){
            return [{status:404},{success:false, err:"pizzas-not-found"}];
        }
        return [{status:200},{success:true, result:result}];
    }

    async deleteOnePizza(dtoDeletePizza: DTOdeleteOnePizza){
        let result = await pizzaSchema.findOneAndDelete({_id:dtoDeletePizza.id})
            .catch((err:mongoose.Error)=>{
                return [{status:500},{success:false, err:"global-error"}];
            });
            
        if(!result){
            return [{status:404},{success:false, err:"pizza-not-found"}];
        }

        return [{status:202}, {success:true, result:"pizza-deleted"}];
    }
    async updatePizz(dtoUpdatePizza: DTOupdatePizza){
        let result = await pizzaSchema.findOneAndUpdate({_id:dtoUpdatePizza.id}, dtoUpdatePizza, {new:true, useFindAndModify:false})
            .catch((err:mongoose.Error)=>{
                return [{status:500},{success:false, err:"global-error"}];
            })
        if(!result){
            return [{status:404}, {success:false, err:"pizza-not-found"}];
        }
        return [{status:200}, {success:true, result:result}];
    }    
}