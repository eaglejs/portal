import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.usersRegistered().pipe(map(hasUsers => {
      if (!hasUsers) {
        this.router.navigate(['/register']);
        return false;
      } else if (this.authService.isAdmin) {
        return true;
      }
      return false;
    }));
  }
}
