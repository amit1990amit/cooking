import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipesService {
    recipesChanged = new Subject<Recipe[]>()

    private recipes: Recipe[] = [
        new Recipe('Burger',
            'burger desc', 
            'https://pbs.twimg.com/media/Dqw8BMmXgAAyecA.jpg',
            [
                new Ingredient('meat',1),
                new Ingredient('chips',10)
            ]),
        new Recipe('Pizza',
            'Pizza desc', 
            'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg',
            [
                new Ingredient('due',2),
                new Ingredient('cheese',1)
            ])
      ];
 
    constructor(private slService: ShoppingListService) {}

    getRecipes(){
        return this.recipes.slice()
    }

    addIngredintsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients)
    }

    getRecipe(idx:number){ //saposed to be id
        return this.recipes[idx]
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index:number,recipe:Recipe){
        //this.recipes.splice(index,1,recipe)
        this.recipes[index] = recipe
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index:number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice())
    }
}