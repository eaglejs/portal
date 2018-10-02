import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
