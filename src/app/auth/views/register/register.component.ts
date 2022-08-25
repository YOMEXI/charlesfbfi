import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../domain/user.data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  RegistrationForm!: FormGroup;
  submitted = false;

  loading = false;
  Error!: Observable<any>;
  isUserInfo!: any;
  isLoggedIn!: Observable<boolean>;

  constructor(
    private authService: AuthenticationService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();

    this.isLoggedIn = this.authService.isLoggedIn();
    this.isUserInfo = this.authService.isUserInfo();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  createLoginForm() {
    this.RegistrationForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      remember: [''],
    });
  }
  onSubmit() {
    const { email, password, username } = this.RegistrationForm.value;

    const newUser: User = {
      email,
      password,
      username,
      role: ['user'],
    };

    return this.authService.register(newUser).subscribe(
      (data) => {
        this.loading = false;
        setTimeout(() => {
          this.router.navigateByUrl('email-verification');
        }, 1000);
      },
      (error) => {
        this.Error = error;
      }
    );
  }
}
