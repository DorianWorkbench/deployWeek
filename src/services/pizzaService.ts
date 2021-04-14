import { PizzaRepository } from "../repository/pizzaRepository";

export type DTOaddPizza={
    pizzaName:string;
    cost:number;
    description:string;
}

export type DTOgetOnePizza={
    id:string
}

export type DTOdeleteOnePizza={
    id:string
}

export type DTOupdatePizza={
    id:string;
    cost:number;
    description:string;
    pizzaName:string;
}

export type DTOgetPizzaByName={
    pizzaName:string;
}

export class PizzaService{
    
    constructor(private pizzaRepo:PizzaRepository){}
    
    async addingPizza(dtoAddPizza:DTOaddPizza){
        let [status, data] = await this.pizzaRepo.insertPizza(dtoAddPizza);
        return [{status:status.status}, data];
    }

    async getOnePizza(dtoGetPizza:DTOgetOnePizza){
        let [status, data] = await this.pizzaRepo.getPizza(dtoGetPizza);
        return [{status:status.status}, data];
    }

    async getAllPizza(){
        let [status, data] = await this.pizzaRepo.getPizzas();
        return [{status:status.status}, data];
    }
    
    async supressPizza(dtoDeletePizza:DTOdeleteOnePizza){
        let [status, data] = await this.pizzaRepo.deleteOnePizza(dtoDeletePizza);
        return [{status:status.status}, data];
    }
    async updateOnePizza(dtoUpdatePizza: DTOupdatePizza){
        let [status, data] = await this.pizzaRepo.updatePizz(dtoUpdatePizza);
        return [{status:status.status}, data];
    }
}