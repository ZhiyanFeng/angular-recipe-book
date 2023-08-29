import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {BehaviorSubject, catchError, Observable, Subject, tap, throwError} from "rxjs";
import {AuthResponseData} from "../shared/auth-response-data";
import {User} from "./user/user.module";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  user = new BehaviorSubject<User>(null);
  expiration: number;
  constructor(private http: HttpClient, private router: Router) {
  }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(environment.signupEndpoint, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError.bind(this)), tap(this.handleAuthentication));
  }

  signin(email: string, password: string){
    return this.http.post<AuthResponseData>(environment.signinEndpoint, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError.bind(this)), tap(this.handleAuthentication.bind(this)));
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage = 'An unknown error occured!';
    if(error.error.error){
      errorMessage = error.error.error.message;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(responseData: AuthResponseData){
    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn *1000);
    const user = new User(responseData.email,
      responseData.localId,
      responseData.idToken,
      expirationDate);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(this.user.value))
    this.expiration = +responseData.expiresIn * 1000;
    this.autoLogout();
  }
  autoLogout(){
    setTimeout(()=>{
      this.logout();
    }, this.expiration);
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/sign-in']);
    localStorage.clear();
  }

  autoLogin(){
    const userData =JSON.parse(localStorage.getItem('user'));
    const u:User = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate);
    this.user.next(u);
  }
}
