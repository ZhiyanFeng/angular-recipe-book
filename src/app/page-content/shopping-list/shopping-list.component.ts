import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients:Ingredient[];
  private igChangeSub: Subscription;



  constructor(private shoppingListService: ShoppingListService) {

  }
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredient();
    this.igChangeSub = this.shoppingListService.updatedIngredients.subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients;
    })

  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEdit(index: number){
    this.shoppingListService.editIngredient(index);
  }


}
