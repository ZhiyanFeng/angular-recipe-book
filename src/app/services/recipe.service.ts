import {EventEmitter, Injectable, Output} from '@angular/core';
import {Recipe} from "../page-content/recipes/recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes:Recipe[] = [];

  updatedRecipe :Subject<Recipe[]>= new Subject();
  constructor() { }

  broadCast(){
    this.updatedRecipe.next(this.recipes);
  }

  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(i:number){
    return this.recipes.at(i)!;
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.broadCast();
  }
  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.broadCast();
  }

  initRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.updatedRecipe.next(this.recipes);
  }



}
