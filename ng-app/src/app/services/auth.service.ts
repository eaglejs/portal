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
  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  private setSession(authPacket: AuthPacket) {
    localStorage.setItem('jwt', authPacket.jwt);
    localStorage.setItem("expiration", JSON.stringify(authPacket.expiration));
  }

  getExpiration() {
    const expiration = localStorage.getItem("expiration");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getAuthPacket(): AuthPacket {
    return this.authPacket$.value;
  }

  logout(): void {
    this.authPacket$.next(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('expiration');
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

  register(pkg): Observable<any> {
    return this.http.post<any>('/api/register', pkg).pipe(
      map(authPacket => {
        this.authPacket$.next(authPacket);
        this.setSession(authPacket);
        return authPacket;
      }),
      shareReplay()
    );
  }
}
