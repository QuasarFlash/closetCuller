import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username:string;
  password:string;
  confirmPassword:string;
   
  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  checkPassword() {
    if (this.password != this.confirmPassword) {
      this.authSvc.presentAlert("Passwords don't match!","");
      return false;
    } else {
      return true;
    }
  }

  createUser() {
    if (this.checkPassword()) {
      this.authSvc.register(this.username,this.password);
    } else {
      // Password weak
    }
  }

}
