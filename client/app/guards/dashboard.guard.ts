import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../services/session.service'
import { Router } from '@angular/router'
import { tokenNotExpired, AuthHttp} from 'angular2-jwt'

@Injectable()
export class DashboardGuard implements CanActivate, CanActivateChild {
  constructor (
    private http: AuthHttp, 
    private session: SessionService, 
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.session.loggedIn ? 
      true : (this.router.navigate(['/home']), false)
  }
  
  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.session.loggedIn ? 
      true : (this.router.navigate(['/home']), false)
  }
}
