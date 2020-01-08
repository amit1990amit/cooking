import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.sevice';


@Injectable()
export class DataStorageService {
    constructor(private http:HttpClient, private recipesService: RecipesService){
        
    }

    storeRecipes(){
        const recipes = this.recipesService.getRecipes()
        return this.http.put('https://ng-recipe-book-c793b.firebaseio.com/recipes.json',recipes)
            .subscribe(
                (response) => {
                    console.log(response)
                }
            )
    }

    fetchRecipes(){
        this.http.get('https://ng-recipe-book-c793b.firebaseio.com/recipes.json')
            .subscribe(
                (recipes) => {
                    console.log(recipes)
                }
            )
    }
}