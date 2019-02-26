import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-respassword',
  templateUrl: './respassword.component.html',
  styleUrls: ['./respassword.component.css']
})
export class RespasswordComponent implements OnInit {

  email : string;
  newpass: string;
  valid : boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isEmailValid(){
    if(this.valid){
      this.verifyNewPass();
    }else{
      this.verifyEmail();
    }
  }
  verifyNewPass(){
    if(this.newpass){
      console.log("Password Changed");
      this.router.navigate(['/login']);
    }
    else{
      this.valid = true;
    }
  }

  verifyEmail(){
    if(this.email){
      this.valid = true;
    }
    else{
      this.valid = false;
    }
    console.log(this.valid);  
  }

}
