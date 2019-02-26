import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

declare var jQuery: any;
declare var $: any;

@Injectable()
export class ValidateService {

  constructor(
    private authService: AuthService
  ) { }


  validateRegister(user) {
    if (user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email) && !this.authService.valEmail(email)) {
      return true;
    } else {
      return false;
    }
  }

  valEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateLogin(user, input) {
    var email = false, pass = false;
    if (this.valEmail(user.email) == false) {
      this.showValidate(input[0]);
    } else {
      this.hideValidate(input[0]);
      email = true;
    }
    if (this.valPass(user.password) == false) {
      this.showValidate(input[1]);
    } else {
      this.hideValidate(input[1]);
      pass = true;
    }
    if (email === true && pass === true) {
      return true;
    } else {
      return false;
    }
  }

  valPass(pass) {
    if (pass == '') {
      return false;
    } else {
      return true;
    }
  }

  validatePass(pass, cpass) {
    if (pass.toString() != cpass.toString()) {
      return false;
    } else {
      return true;
    }
  }

  showValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate');
  }

  hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('alert-validate');
  }
}
