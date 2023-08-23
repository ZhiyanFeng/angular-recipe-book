import { Injectable, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit{
  updatedIngredients = new Subject<Ingredient[]>();
  ingrToEdit = new Subject<Ingredient>();
  ingrIndex = new Subject<number>();

  constructor(){
    this.ngOnInit();

  }
  ngOnInit() {
    let ingredients:Ingredient[] = [
        new Ingredient('apple', 5),
        new Ingredient('orange', 4)
      ];
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }


  getIngredient(){
      let ingredients =  JSON.parse(localStorage.getItem('ingredients') || '{}');
      return ingredients;
  }
  addIngredients(i: Ingredient){
    let ingredients  = JSON.parse(localStorage.getItem('ingredients') || '{}');
    ingredients.push(i);
    this.updatedIngredients.next(ingredients.slice());
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }

  setIngredients(i: Ingredient[]){
    localStorage.setItem('ingredients', JSON.stringify(i));
  }

  editIngredient(index: number){
    let ingr =  JSON.parse(localStorage.getItem('ingredients') || '{}')[index];
    this.ingrToEdit.next(ingr);
    this.ingrIndex.next(index);
  }
  updateIngredient(i:number, ingr:Ingredient){
    let ingredients  = JSON.parse(localStorage.getItem('ingredients') || '{}');
    ingredients[i]= ingr;
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
    this.updatedIngredients.next(ingredients.slice());
  }

  deleteIngr(index: number){
    let ingredients  = JSON.parse(localStorage.getItem('ingredients') || '{}');
    ingredients.splice(index, 1);
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
    this.updatedIngredients.next(ingredients.slice());
  }
}
