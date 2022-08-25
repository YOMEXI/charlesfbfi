import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  of,
  ReplaySubject,
  throwError,
} from 'rxjs';
import {
  catchError,
  delay,
  retry,
  shareReplay,
  take,
  tap,
  timeout,
} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../domain/user.data';
import { Router } from '@angular/router';

import { UserResponse } from '../domain/userResponse.data';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseApi = environment.apiBaseUrl;
  //
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  isUserSubject = new BehaviorSubject<UserResponse | string | null>(
    this.hasUser()
  );

  constructor(private http: HttpClient, private router: Router) {}

  register(newUser: User) {
    return this.http.post(this.baseApi + '/auth/signup', newUser).pipe(
      take(1),

      catchError((err) => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  login(User: User) {
    return this.http
      .post<UserResponse>(this.baseApi + '/auth/signin', User)
      .pipe(
        take(1),
        tap((res: any) => {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('user', JSON.stringify(res));

          setTimeout(() => {
            this.isLoginSubject.next(true);
            this.isUserSubject.next(res);
            this.router.navigateByUrl('dashboard');
          }, 2000);
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private hasUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  isUserInfo() {
    return this.isUserSubject.asObservable();
  }
}
