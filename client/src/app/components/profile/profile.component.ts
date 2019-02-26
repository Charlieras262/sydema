import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe(res => {
        this.authService.loggedIn();
        const profile = JSON.parse(JSON.stringify(res));
        profile.user.type = this.userType(profile.user.type);
        this.user = profile.user;
      },
      err => {
        console.error(err);
      }); 
  }
  userType(type) {
    if (type === 'A') {
      return 'Administrador';
    } else if (type === 'T') {
      return 'Teacher';
    } else if (type === 'S') {
      return 'Student';
    }
  }
}
