import { AuthService } from './../../shared/services/AuthService/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user: UserModel;
  isMobile: boolean = false;

  constructor(
    private _screenSizeService: ScreenSizeService,
    protected _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this._authService.getCurrentUser();
    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
    console.log(this.user);
  }
}
