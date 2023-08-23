import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../../shared/ingredient.model";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe = <Recipe>{};
  id: number;
  constructor(private shoppingListService: ShoppingListService, private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router){
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }
  registerIngredients(i: Ingredient[]){
    this.shoppingListService.setIngredients(i);
    this.router.navigate(['shopping-list'],  {relativeTo: this.route.parent?.parent})
  }

  routeTo(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../recipes']);
  }
}
