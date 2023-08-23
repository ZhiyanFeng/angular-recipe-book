import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../page-content/recipes/recipe.model";
import {RecipeService} from "./recipe.service";
import {environment} from "../../environments/environment";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  saveRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(environment.recipesUrl, recipes).subscribe(response => {
      console.log(response);
    });
  }
  fetchRecipes(){
    return this.http.get<Recipe[]>(environment.recipesUrl).pipe(
        map(recipes=>{
          return recipes.map(recipe=>{
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
        tap((recipes)=>{
          this.recipeService.initRecipes(recipes);
        })
    )
  }
}
