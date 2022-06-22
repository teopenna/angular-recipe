import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface IAuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<IAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcxSvaJEmEJdYp6O7_TOvj_Q-9aimn5RM',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(() => new Error(errorMessage));
          }
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists';
              break;
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
