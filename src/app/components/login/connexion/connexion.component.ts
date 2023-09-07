import { AuthService } from './../../../services/AuthService/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  credentials: CredentialsModel = { email: '', password: '' };
  invalidCredentials: Boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    console.log(this.credentials);
    this.authService.login(this.credentials).subscribe({
      next: (customer) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.invalidCredentials = true;
      },
    });
  }
  // (res) => (this.invalidCredentials = true),
  // (err) => this.router.navigate(['/'])
}
