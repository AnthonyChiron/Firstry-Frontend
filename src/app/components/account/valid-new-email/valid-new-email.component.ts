import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/data/UsersService/users.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

@Component({
  selector: 'app-valid-new-email',
  templateUrl: './valid-new-email.component.html',
  styleUrls: ['./valid-new-email.component.scss'],
})
export class ValidNewEmailComponent implements OnInit {
  isEmailValidated: boolean = false;
  isTokenValid: boolean = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UsersService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      let token = params['token'];
      if (token) {
        this._userService.validateNewEmail(token).subscribe({
          next: (user) => {
            this.isEmailValidated = true;
            this._authService.updateUserNewEmail(user);
          },
          error: (err) => {
            this.isTokenValid = false;
          },
        });
      } else {
        this.isTokenValid = false;
      }
    });
  }
}
