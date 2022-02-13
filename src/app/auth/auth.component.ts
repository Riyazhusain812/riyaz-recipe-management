import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authObs = new Observable<AuthResponseData>();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    this.isLoading = true;

    if (this.isLoginMode) {
      const email = authForm.value.email;
      const password = authForm.value.password;
      this.authObs = this.authService.login(email, password);
    } else {
      const email = authForm.value.email;
      const password = authForm.value.password;
      this.authObs = this.authService.signUp(email, password);
    }

    this.authObs.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.isLoading = false;
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );

    console.log(authForm.value);
    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
