import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../domain/user.data';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  Error!: Observable<any>;
  isUserInfo!: any;
  isLoggedIn!: Observable<boolean>;

  //
  constructor(
    private authService: AuthenticationService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  goToRegister() {
    this.router.navigateByUrl('register');
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
      remember: [''],
    });
  }

  onSubmit() {
    const { password, username } = this.loginForm.value;
    console.log({ password, username });
    const newUser: User = {
      password,
      username,
    };

    return this.authService.login(newUser).subscribe(
      (data) => {
        this.loading = false;
      },
      (error) => {
        this.Error = error;
      }
    );
  }
}
