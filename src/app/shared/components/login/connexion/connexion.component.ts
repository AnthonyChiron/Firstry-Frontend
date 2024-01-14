import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
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
  isResetPassword: Boolean = false;
  isLoading: Boolean = false;
  @Output() connected: EventEmitter<void> = new EventEmitter<void>();

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
    this.isLoading = true;
    try {
      this.authService.login(this.connexionForm.value).subscribe({
        next: (token) => {
          this.connected.emit();
          this.authService.saveToken(token);
          this.isLoading = false;
          if (!this.authService.getCurrentUser().isValid)
            this.router.navigate(['/account/validateEmail']);
          else {
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            if (this.authService.getCurrentUser().role == 'contest')
              this.router.navigate(['/dashboard']);
            else this.router.navigate([returnUrl || '/']);
          }
        },
        error: (err) => {
          this.invalidCredentials = true;
          console.log(this.invalidCredentials);
          console.log(err);
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submit();
    }
  }
}
