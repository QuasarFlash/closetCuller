import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  username:string;
  password:string;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  loginGoogle() {
    this.authSvc.login();
  }

  login() {
    console.log("Username " + this.username);
    console.log("Password " + this.password);
  }

}
