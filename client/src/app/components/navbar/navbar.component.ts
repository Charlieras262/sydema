import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import * as io from 'socket.io-client';
import { ProjectVariable } from 'src/app/variables/project-variables';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: string;
  id: string;
  socket = io(new ProjectVariable().serverLocation);

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.getUsername();
  }

  onLogoutClick() {
    this.authService.logout();
    $.toaster('You are logged out <i class="fa fa-check"></i>', 'Notice', 'success');
  }

  getUsername() {
    if (localStorage.getItem('user')) {
      this.username = JSON.parse(localStorage.getItem('user')).username;
      this.id = JSON.parse(localStorage.getItem('user')).id;
    }
    this.socket.on('getUsername', (data) => {
      console.log(data);
      if (!localStorage.getItem('user')) {
        this.username = data.username;
        this.id = data.id;
      }
    });
  }
}
