import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpModel as SignUpModel } from 'src/app/models/signUp.model';
import { rolesEnum } from 'src/app/constants/rolesEnum';
import { RegisterUserService } from 'src/app/shared/data/RegisterUserService/register-user.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm: SignUpModel = {
    email: '',
    password: '',
    role: rolesEnum.RIDER,
  };
  invalidCredentials: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerUserService: RegisterUserService,
    private authService: AuthService
  ) {}

  test() {}

  submit() {
    console.log(this.signUpForm);
    this.authService.signUp(this.signUpForm).subscribe({
      next: () => {
        this.authService
          .login({
            email: this.signUpForm.email,
            password: this.signUpForm.password,
          })
          .subscribe({
            next: (token) => {
              this.authService.saveToken(token);
              this.router.navigate(['/account/validEmail']);
            },
            error: (err) => {},
          });
      },
      error: (err) => (this.invalidCredentials = true),
    });
  }
}
