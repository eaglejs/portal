import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import { AuthPacket } from '../models/auth-packet';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authPacket$: BehaviorSubject<AuthPacket> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {
    const authPacket = JSON.parse(localStorage.getItem('authPacket'));
    if (authPacket) {
      this.refreshToken().subscribe();
    }
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  private setSession(authPacket: AuthPacket) {
    localStorage.setItem('authPacket', JSON.stringify(authPacket));
  }

  getExpiration() {
    const authPacket = JSON.parse(localStorage.getItem('authPacket'));
    const expiresAt = JSON.parse(authPacket.expiration);
    return moment.unix(expiresAt).utc();
  }

  getAuthPacket(): AuthPacket {
    return this.authPacket$.value;
  }

  logout(): void {
    this.authPacket$.next(null);
    localStorage.removeItem('authPacket');
    this.router.navigate(['/login']);
  }

  login(pkg): Observable<AuthPacket> {
    return this.http.post<AuthPacket>('/api/login', pkg).pipe(
      map(authPacket => {
        this.authPacket$.next(authPacket);
        this.setSession(authPacket);
        return authPacket;
      }),
      shareReplay()
    );
  }

  register(pkg): Observable<AuthPacket> {
    return this.http.post<AuthPacket>('/api/register', pkg).pipe(
      map(authPacket => {
        this.authPacket$.next(authPacket);
        this.setSession(authPacket);
        return authPacket;
      }),
      shareReplay()
    );
  }

  isAdmin(): boolean {
    const authPacket: AuthPacket = this.authPacket$.getValue();
    if (authPacket && authPacket.user.role === 'admin') {
      return true
    }
    return false;
  }

  usersRegistered(): Observable<any> {
    return this.http.get<any>('/api/has-users');
  }

  refreshToken(): Observable<AuthPacket> {
    const payload = JSON.parse(localStorage.getItem('authPacket'));
    return this.http.post<AuthPacket>('/api/refresh-token', payload).pipe(
      map(authPacket => {
        this.authPacket$.next(authPacket);
        return authPacket;
      })
    );
  }
}
