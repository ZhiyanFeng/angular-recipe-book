import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {AuthResponseData} from "../shared/auth-response-data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username: string = "";
  show = false;
  password = "";
  loginInvalid = false;
  isLoginMode = false;
  form: FormGroup;
  isLoading = false;
  error: string;
  httpResponseObs: Observable<AuthResponseData>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: "",
      password: ""
    })
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.httpResponseObs = this.authService.signin(email, password);
    } else {
      this.httpResponseObs = this.authService.signup(email, password)
    };

    this.httpResponseObs.subscribe(
      {
        next: (responseDate)=>{
          console.log(responseDate);
          this.router.navigate(['/recipes'])
          this.isLoading = false;
        },
        error: (error=>{
          this.error = error;
          this.isLoading = false;
          console.log(error);
        })
      }
    )
    this.form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


}
