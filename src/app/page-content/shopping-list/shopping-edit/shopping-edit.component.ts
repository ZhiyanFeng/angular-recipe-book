import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../../shared/ingredient.model";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
  name: string;
  amount: number;
  shoppingListEditForm: FormGroup;
  editMode = false;
  ingrEditIndex:number;

  constructor(private shoppingListService: ShoppingListService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
       this.shoppingListEditForm = this.fb.group({
         name:['', Validators.required],
         amount: ['0', Validators.required]
       })
        this.shoppingListService.ingrToEdit.subscribe((ingr)=>
        {
          this.shoppingListEditForm.setValue({
            name :ingr.name,
            amount : ingr.amount
          })
        });
       this.shoppingListService.ingrIndex.subscribe((index)=>{
         this.ingrEditIndex = index;
         this.editMode = true;
       })
    }

  onSubmit(){
    this.name = this.shoppingListEditForm.get('name')?.value;
    this.amount = this.shoppingListEditForm.get('amount')?.value;
    const newIngredient = new Ingredient(this.name, this.amount);
    if(!this.editMode){
      this.shoppingListService.addIngredients(newIngredient);
    }else{
      this.shoppingListService.updateIngredient(this.ingrEditIndex, newIngredient);
      this.editMode = !this.editMode;
    }
    this.shoppingListEditForm.reset();
  }

  onClear(){
    this.shoppingListEditForm.reset();
    this.editMode = false;
  }
  deleteIngr(){
    this.shoppingListService.deleteIngr(this.ingrEditIndex);
    this.shoppingListEditForm.reset();
  }
}
