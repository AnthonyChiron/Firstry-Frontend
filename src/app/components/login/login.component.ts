import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLogin: boolean = false;
  isRegister: boolean = false;

  constructor(private route: Router) {
    if (route.url.includes('login')) this.isLogin = true;
    else this.isRegister = true;
  }

  closeModal() {}
}
