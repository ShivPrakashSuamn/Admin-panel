import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  url: any;

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    this.url = route.routeConfig?.path;
    let arr = ["login", "signup"];
    if (isLoggedIn) {
      if (arr.includes(this.url)) {
        return this.router.navigate(['/dashboard']); 
      } else {
        return true;
      }
    } else {
      return this.router.navigate(['/login']);
    }
  }
}
