import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session;
  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return true;
  }

  login(pkg): Observable<User>{
    return this.http.post<User>('/api/login', pkg).pipe(map(res => this.session), shareReplay());
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout(): Observable<any>{
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    return this.http.get<any>('/api/logout');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  register(pkg): Observable<any> {
    return this.http.post<any>('/api/register', pkg);
  }
}
