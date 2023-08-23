import {Component, EventEmitter, Output} from '@angular/core';
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private httpService: HttpService) {
  }
  onSaveRecipes(){
    this.httpService.saveRecipes();
  }
  onFetchRecipes(){
    this.httpService.fetchRecipes().subscribe();
  }
}
