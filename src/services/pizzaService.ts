import { PizzaRepository } from "../repository/pizzaRepository";

export type DTOaddPizza={
    pizzaName:string;
    cost:number;
    description:string;
}

export type DTOgetOnePizza={
    id:string
}

export class PizzaService{
    
    constructor(private pizzaRepo:PizzaRepository){}
    
    async addingPizza(dtoAddPizza:DTOaddPizza){
        let [status, data] = await this.pizzaRepo.insertPizza(dtoAddPizza);
        return [{status:status.status}, data];
    }

    async getOnePizza(dtoGetPizza:DTOgetOnePizza){
        let [status, data] = await this.pizzaRepo.getPizza(dtoGetPizza);
        return [{status:status.status, data}];
    }
}