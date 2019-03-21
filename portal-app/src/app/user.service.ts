import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = {};
  isRegistered = false;

  constructor(private http: HttpClient) {}

  // checkLogin() {
  //   return this.http({
  //     method: 'post',
  //     url: '/rest/isLoggedIn'
  //   }).then( (response) => {
  //     if (response.data.username) {
  //       return response.data;
  //     } else {
  //       return false;
  //     }
  //   }, (error) => {
  //     console.log(error);
  //     return false
  //   });
  // }

  // checkInitialRegistration() {
  //   return this.http({
  //     method: 'post',
  //     url: '/rest/isRegistered'
  //   }).then( response => {
  //     this.isRegistered = response.data.isRegistered;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // getUserInformation() {
  //   return this.http({
  //     method: 'post',
  //     url: '/rest/getUserInformation'
  //   }).then( response => {
  //     this.user = response.data;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // login(event): Observable<User> {
  //   return this.http.post<User>('/rest/login/', this.model, httpOptions).pipe(
  //     tap((user: User) => {
  //       this.userService.setUser(user);
  //       // TODO: navigate to dashboard
  //     }),
  //     catchError('Failed to login')
  //   );
  // }

  // setUser(user) {
  //   this.user = user;
  // }

  // getUser() {
  //   return this.user;
  // }
}
