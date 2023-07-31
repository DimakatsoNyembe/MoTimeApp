import { Injectable } from '@angular/core';
import { Observable, map, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from '../shared/register-user';
import { LoginUser } from '../shared/login-user';
import { UserDetails } from '../shared/user-details';
import { ForgotPassword } from '../shared/forgot-password';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

export class APIService {
  private currentUser: User | undefined;
  
  private userRoleSubject = new BehaviorSubject<string[]>([]);
  userRole$ = this.userRoleSubject.asObservable();

apiUrl = 'https://localhost:7153/api/'
private userPayload: any;
httpOptions ={
  headers: new HttpHeaders({
    ContentType: 'application/json'
  })
}

  constructor(private httpClient: HttpClient, private router: Router) {
    this.userPayload = this.decodeJwtToken();
  }
  Register(user:any)
  {
    return this.httpClient.post<any>(`${this.apiUrl}Authentication/Register`, user)
  }
  Login(user:any)
  {
    return this.httpClient.post<any>(`${this.apiUrl}Authentication/Login`, user)
  }
  ForgotPassword(emailAddress: string) {
    return this.httpClient.post(`${this.apiUrl}Authentication/ForgotPassword`, emailAddress , {...this.httpOptions, responseType: 'text'})
    .pipe(
      catchError((error) => {
        console.error('Error occurred while registering user:', error);
        // Handle the error as per your application's requirements
        // Return an observable or throw an error to be handled by the caller
        return throwError('Failed to register user. Please try again later.');
      })
    );
  }

  forgotPassword(payload: any) {
    return this.httpClient.post(`${this.apiUrl}Authentication/ForgotPassword`, payload, {...this.httpOptions, responseType: 'text'})
    .pipe(
      catchError((error) => {
        console.error('Error occurred while registering user:', error);
        // Handle the error as per your application's requirements
        // Return an observable or throw an error to be handled by the caller
        return throwError('Failed to register user. Please try again later.');
      }));
  }

  resetPassword(payload: any) {
    return this.httpClient.post(`${this.apiUrl}Authentication/ResetPassword`,payload, {...this.httpOptions, responseType: 'text'})
    .pipe(
      catchError((error) => {
        console.error('Error occurred while resetting the password:', error);
        // Handle the error as per your application's requirements
        // Return an observable or throw an error to be handled by the caller
        return throwError('Failed to reset the. Please try again later.');
      }));
  }
  setCurrentUser(user: User) {
    this.currentUser = user;
  }
  getUserDetails(): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(`${this.apiUrl}Authentication/ViewAllUsers`);
  }

  getUserEmail(email: string): Observable<string | undefined> {
    const apiUrl = `http://localhost:5240/api/Authentication/ViewUserDetails/${email}`;
    const mediaType = 'application/json';
  
    // Set the request headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': mediaType
      })
    };
  
    return this.httpClient.get<string>(apiUrl, httpOptions);
  }
  UpdateUser(code:any, inputdata:any)
  {
    return this.httpClient.put(this.apiUrl+code, inputdata);
  }
  IsLoggedIn()
  {
    return !!localStorage.getItem('token');
  }
  GetUserRole()
  {
    return localStorage.getItem('Role') != null?localStorage.getItem('Role')?.toString():'';
  }
  
  setUserRole(userRole: string[]) {
    this.userRoleSubject.next(userRole);
  }

  clearUserRole() {
    this.userRoleSubject.next([]);
  }
  logOut()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  storeToken(tokenValue: string)
  {
    localStorage.setItem('token', tokenValue);
  }
  getToken()
  {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }
  decodeJwtToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token);
  } 
  getUserNameFromToken()
  {
    if(this.userPayload)
    {
      return this.userPayload.name;
    }
  } 
  getRoleFromToken()
  {
    if(this.userPayload)
    {
      return this.userPayload.role;
    }
  }
  getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiUrl}Authentication/GetAllUsers`);
  } 
}
