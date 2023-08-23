import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../../services/recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  id: number;
  editMode = false;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private rs: RecipeService, private fb: FormBuilder
  ,private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id'];
      this.editMode = params['id']!= null;
      this.initForm();
    })
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let ingrArray:FormArray<FormGroup> = <FormArray>this.fb.array([]);

    if (this.editMode) {
      const recipe = this.rs.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      for(let ingr of recipe.ingredients){
        const ingrForm = this.fb.group({
          name: ingr.name,
          amount: ingr.amount
        })
        ingrArray.push(ingrForm);
      }
    }
    this.form = this.fb.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath],
      description: [recipeDescription],
      ingredients: ingrArray
    });
  }

  onSubmit(){
    if(this.editMode){
      this.updateRecipe(this.id, this.form.value);
    }else{
      this.addRecipe(this.form.value);
      this.router.navigate(['../'], {relativeTo: this.route})
    }
  }

  addRecipe(recipe: Recipe){
    this.rs.addRecipe(recipe);
  }

  updateRecipe(id:number, recipe: Recipe){
    this.rs.updateRecipe(id, recipe);
  }

  get ingredients() {
    let ingredients:FormArray<FormGroup> = this.form.controls['ingredients'] as FormArray;
    return ingredients;
  }

  addIngredient(){
    const ingrForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required,Validators.pattern(/^[1-9][0-9]*$/)]]
    })
    this.ingredients.push(ingrForm);
  }

  deleteIngredient(id: number){
    this.ingredients.removeAt(id);
  }
}
