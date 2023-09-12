import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/AuthService/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  constructor(protected authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['./register']);
  }

  isLoggedIn() {
    console.log(this.authService.getCurrentUser());
  }
}
