import { User } from './../../models/user';
import { ChatService } from './../../services/chat/chat.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from 'src/app/services/validate/validate.service';

declare var jQuery: any;
declare var $: any;
var input: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any;
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  cpassword: string;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private router: Router,
    private chat: ChatService
  ) { }

  ngOnInit() {
    input = input = $('.validate-input .input100');
    $('.validate-form .input100').each(function () {
      $(this).focus(function () {
        var thisAlert = $(this).parent();
        $(thisAlert).removeClass('alert-validate');
      });
    });
  }

  onRegisterSubmit() {
    const user = {
      _id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      type: $('input:radio[name=type]:checked').val(),
      cpass: this.cpassword
    }
    this.authService.authRegisterInfo(user)
      .subscribe(res => {
        var u = JSON.parse(JSON.stringify(res));
        this.valComp(input[0], u.id);
        this.valComp(input[1], u.name);
        this.valComp(input[2], u.username);
        this.valComp(input[3], u.email);
        this.valComp(input[5], u.password);
        if (u.id.name) user.name = u.id.name;
        if (u.success) {
          this.registerUser(user);
        }
      });
  }

  registerUser(user) {
    // Register user
    this.authService.registerUser(user).subscribe(res => {
      var data = JSON.parse(JSON.stringify(res));
      if (data.success) {
        var chat = {_id: user._id}
        this.chat.postChat(chat)
          .subscribe(res => {
            console.log(res);
            $.toaster('You are now registered and can log in <i class="fa fa-check-circle"></i>', 'Notice', 'success');
            this.router.navigate(['/login']);
          });
      } else {
        console.log(data);
      }
    });
  }


  valComp(input, data) {
    if (data.success) {
      this.validateService.hideValidate(input);
    } else {
      $.toaster(data.msg + ' <i class="fa fa-times"></i>', 'Notice', 'danger');
      this.validateService.showValidate(input);
      return false;
    }
  }
}
