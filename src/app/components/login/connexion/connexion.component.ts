import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/shared/auth/AuthService/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  credentials: CredentialsModel = { email: '', password: '' };
  invalidCredentials: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submit() {
    this.authService.login(this.credentials).subscribe({
      next: (customer) => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      },
      error: (err) => {
        this.invalidCredentials = true;
      },
    });
  }
  // (res) => (this.invalidCredentials = true),
  // (err) => this.router.navigate(['/'])
}
