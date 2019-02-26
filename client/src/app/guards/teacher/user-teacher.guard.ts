import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UserTeacherGuard implements CanActivate {
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
        if (user.type == 'T') {
          return true;
        } else {
          switch(user.type){
            case 'A':
            this.router.navigate(['/dashboard']);
            break;
            case 'S':
            this.router.navigate(['/coursesasigned']);
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
