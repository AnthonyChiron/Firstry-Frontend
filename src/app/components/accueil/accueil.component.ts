import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
      transition('* <=> void', animate('500ms ease-in-out')),
    ]),
  ],
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
