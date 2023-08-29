import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageContentComponent} from './page-content/page-content.component';
import {ShoppingListComponent} from './page-content/shopping-list/shopping-list.component';
import {RecipesComponent} from './page-content/recipes/recipes.component';
import {HeaderComponent} from './header/header.component';
import {RecipeDetailComponent} from './page-content/recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './page-content/recipes/recipe-list/recipe-item/recipe-item.component';
import {ShoppingEditComponent} from './page-content/shopping-list/shopping-edit/shopping-edit.component';
import {RecipeListComponent} from "./page-content/recipes/recipe-list/recipe-list.component";
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingListService} from "./services/shopping-list.service";
import { RecipeStartComponent } from './page-content/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './page-content/recipes/recipe-edit/recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import {RecipeService} from "./services/recipe.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';
import {MatCardModule} from "@angular/material/card";
import {NgCircleProgressModule} from "ng-circle-progress";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AuthInterceptor} from "./auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    PageContentComponent,
    ShoppingListComponent,
    RecipesComponent,
    HeaderComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingEditComponent,
    RecipeListComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    MatProgressSpinnerModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
