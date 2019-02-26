import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UserAdminGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['/login']);
      $.toaster("Logged in is necesary" + ' <i class="fa fa-times"></i>', 'Notice', 'warning');
      return false;
    } else {
      var user = JSON.parse(localStorage.getItem('user'));
      if (user.type == 'A') {
        return true;
      } else {
        switch(user.type){
          case 'S':
          this.router.navigate(['/coursesasigned']);
          break;
          case 'T':
          this.router.navigate(['/coursesasignedteacher']);
          break;
          default:
          this.router.navigate(['/profile']);
          break;
        }
        return false;
      }
    }
  }
}
