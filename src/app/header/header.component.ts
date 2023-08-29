import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpService} from "../services/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject, Subscription} from "rxjs";
import { User } from '../auth/user/user.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated: boolean;
  user: Subscription;

  ngOnInit(): void {
    this.user = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    })
  }
  constructor(private httpService: HttpService,private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }
  onSaveRecipes(){
    this.httpService.saveRecipes();
  }

  onFetchRecipes(){
    this.httpService.fetchRecipes().subscribe();
  }

  onSignin(){
    this.router.navigate(['sign-in'], {relativeTo: this.route})
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.user.unsubscribe();
  }
}
