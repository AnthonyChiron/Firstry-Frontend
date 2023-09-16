import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  activeIndex: number = 0;

  constructor(private route: Router) {
    if (route.url.includes('login')) this.activeIndex = 0;
    else this.activeIndex = 1;
  }

  closeModal() {}
}
