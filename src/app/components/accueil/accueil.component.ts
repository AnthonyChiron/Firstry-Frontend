import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {
  user;
  isLoggedIn: boolean = false;

  constructor(protected authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.user = this.authService.getCurrentUser();
      console.log(this.user);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['./register']);
  }

  isLoggedInBtn() {}

  isValid() {}

  getCurrentUser() {}
}
