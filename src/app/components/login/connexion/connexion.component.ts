import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent implements OnInit {
  connexionForm: FormGroup;
  invalidCredentials: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.connexionForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    console.log(this.connexionForm.value);
    try {
      this.authService.login(this.connexionForm.value).subscribe({
        next: (token) => {
          console.log(token);
          this.authService.saveToken(token);
          if (!this.authService.getCurrentUser().isValid)
            this.router.navigate(['/account/validateEmail']);
          else {
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            this.router.navigate([returnUrl || '/']);
          }
        },
        error: (err) => {
          this.invalidCredentials = true;
          console.log(err);
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
