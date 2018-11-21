import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private router: Router, private authSvc: AuthService) {}

  go(type) {
    this.router.navigateByUrl(`tabs/(home:home/${type})`);
  }

  logout() {
    this.authSvc.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
