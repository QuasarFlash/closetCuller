import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  username:string;
  password:string;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginGoogle() {
    this.authSvc.loginGoogle();
  }

  login() {
    this.authSvc.login(this.username, this.password);
  }

  register() {
    console.log("Attempting to create account");
    this.router.navigate(['/register']);
  }

}
