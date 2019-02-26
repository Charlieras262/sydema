import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ValidateService } from '../../services/validate/validate.service';
import * as io from 'socket.io-client';
import { ProjectVariable } from 'src/app/variables/project-variables';

declare var jQuery: any;
declare var $: any;
let input;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  socket = io(new ProjectVariable().serverLocation);
  constructor(
    public authService: AuthService,
    public validateService: ValidateService,
    public router: Router
  ) { }

  ngOnInit() {
    this.animImage();
    input = input = $('.validate-input .input100');
    $('.validate-form .input100').each(function () {
      $(this).focus(function () {
        const thisAlert = $(this).parent();
        $(thisAlert).removeClass('alert-validate');
      });
    });
  }

  onLoginUser() {
    const user = {
      email: this.email,
      password: this.password
    }
    if (this.validateService.validateLogin(user, input)) {
      this.authService.authenticateUser(user)
        .subscribe(res => {
          var data = JSON.parse(JSON.stringify(res));
          if (data.success) {
            $.toaster('Now you are logged in <i class="fa fa-check-circle"></i>', 'Notice', 'success');
            this.authService.storeUserData(data.token, data.user);
            this.router.navigate(['/dashboard']);
            this.socket.emit('getUsername', data.user);
          } else {
            $.toaster(data.msg + ' <i class="fa fa-times"></i>', 'Notice', 'danger');
            this.router.navigate(['/login']);
          }
        });
    } else {
      $.toaster('Error while login <i class="fa fa-times"></i>', 'Notice', 'danger');
    }
  }

  animImage() {
    $('.js-tilt').tilt({
      scale: 1.1
    })
  }
}
