import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-valid-email',
  templateUrl: './valid-email.component.html',
  styleUrls: ['./valid-email.component.scss'],
})
export class ValidEmailComponent implements OnInit {
  constructor(
    protected authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let token = params['token'];
      let userId = params['userId'];
      if (token) {
        this.authService.validateEmail(token, userId).subscribe({
          next: (result) => {
            this.authService.saveToken(result);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  sendNewEmail() {
    this.authService.sendNewValidationEmail().subscribe({
      next: (result) => {},
      error: (err) => console.log(err),
    });
  }

  backHome() {
    this.router.navigate(['/']);
  }

  backDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
