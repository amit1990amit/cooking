import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model'
import { RecipesService } from '../recipes.sevice';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  subscription: Subscription

 recipes: Recipe[];
  constructor(private recipesService: RecipesService, 
    private router:Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.subscription = this.recipesService.recipesChanged
      .subscribe(
        (recipes:Recipe[]) => {
          this.recipes = recipes
        }
      )
    this.recipes = this.recipesService.getRecipes()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
