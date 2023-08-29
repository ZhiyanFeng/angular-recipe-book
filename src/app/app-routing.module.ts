import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipesComponent} from "./page-content/recipes/recipes.component";
import {ShoppingListComponent} from "./page-content/shopping-list/shopping-list.component";
import {RecipeStartComponent} from "./page-content/recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./page-content/recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./page-content/recipes/recipe-edit/recipe-edit.component";
import {recipesResolver} from "./services/recipes.resolver";
import {AuthComponent} from "./auth/auth.component";


const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
  {path: "recipes", component: RecipesComponent, children: [
    {path:"", component: RecipeStartComponent, resolve: [recipesResolver]},
      {path:"new", component: RecipeEditComponent},
    {path:":id", component: RecipeDetailComponent, resolve: [recipesResolver]},

      {path:":id/edit", component: RecipeEditComponent, resolve: [recipesResolver]}
    ]},
  {path: "shopping-list", component: ShoppingListComponent},
  {path: "sign-in", component: AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
