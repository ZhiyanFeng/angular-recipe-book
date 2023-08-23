import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {RecipeService} from "../../../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe=<Recipe>{};
  @Input() index:number;
  isActive: boolean = false;
    constructor(private recipeService:RecipeService, private router: Router,
                private route: ActivatedRoute) {
  }
  onSelected(){
      this.router.navigate([this.index], {relativeTo: this.route});
      this.isActive = true;
  }
}
