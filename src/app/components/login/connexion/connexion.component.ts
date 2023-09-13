import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

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

  async submit() {
    try {
      this.authService.login(this.credentials).subscribe({
        next: (token) => {
          this.authService.saveToken(token);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        },
        error: (err) => console.log(err),
      });
    } catch (e) {
      console.log(e);
    }
  }
}
