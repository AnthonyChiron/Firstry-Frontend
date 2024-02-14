import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {
  user;
  isLoggedIn: boolean = false;
  selectContest: boolean = false;
  isMobile: boolean = false;

  constructor(
    protected authService: AuthService,
    private router: Router,
    private _screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

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

  youtube() {
    // Open in new tab
    window.open('https://www.youtube.com/watch?v=jNIKUJK3XAc', '_blank');
  }

  isLoggedInBtn() {}

  isValid() {}

  getCurrentUser() {}
}
