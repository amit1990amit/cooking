import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.sevice';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipesService:RecipesService, 
    private route:ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.recipe = this.recipesService.getRecipe(this.id)
          }
        )
  }

  onAddToShoppingList(){
    this.recipesService.addIngredintsToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe(){
  //   this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  onDeleteRecipe(){
    this.recipesService.deleteRecipe(this.id)
    this.router.navigate(['./recipes'])
  }

}
