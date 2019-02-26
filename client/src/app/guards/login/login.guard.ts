import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem('user') === null){
      this.router.navigate(['/login']);
      $.toaster("Logged in is necesary" + ' <i class="fa fa-times"></i>', 'Notice', 'warning');
      return false;
    }else{
      return true;
    }
  }
}
