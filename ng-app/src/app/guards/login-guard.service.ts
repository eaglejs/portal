import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.usersRegistered().pipe(map(hasUsers => {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      if (hasUsers) {
        return true;
      }
      this.router.navigate(['/register']);
      return false;
    }));
  }
}
