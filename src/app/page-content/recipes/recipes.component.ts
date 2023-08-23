import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {normalizeExtraEntryPoints} from "@angular-devkit/build-angular/src/tools/webpack/utils/helpers";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit,OnDestroy{
  selectedRecipe: Recipe = <Recipe>{};
  private subscription: Subscription;

  constructor(private recipeService: RecipeService) {
  }
  ngOnInit() {
  }


  ngOnDestroy(): void {
  }
}
