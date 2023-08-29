import {Inject, Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class User {

  constructor(@Inject(String) public email: string,
              @Inject(String) public id: string,
              @Inject(String) private _token: string,
              private _tokenExpirationDate: Date) {
  }

  get token(){
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;
  }

}
