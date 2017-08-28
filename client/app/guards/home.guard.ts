import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../services/session.service'
import { Router } from '@angular/router'
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class HomeGuard implements CanActivate {
  constructor (private session: SessionService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.session.loggedIn ? (this.router.navigate(['/dashboard']) , false) : true
  }
}
