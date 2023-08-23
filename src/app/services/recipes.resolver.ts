import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {HttpService} from "./http.service";
import {EMPTY, Observable, of, mergeMap, take} from "rxjs";

export const recipesResolver: ResolveFn<boolean> = (route, state)
    : Observable<any>=> {
  const httpService = inject(HttpService);
  return httpService.fetchRecipes();
};
