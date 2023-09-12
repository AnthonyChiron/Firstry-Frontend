import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpModel as SignUpModel } from 'src/app/models/signUp.model';
import { rolesEnum } from 'src/app/constants/rolesEnum';
import { RegisterUserService } from 'src/app/shared/data/RegisterUserService/register-user.service';
import { AuthService } from 'src/app/shared/auth/AuthService/auth.service';

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

  submit() {
    console.log(this.signUpForm);
    this.authService.signUp(this.signUpForm);
    // this.registerUserService.create(this.signUpForm).subscribe({
    //   next: (user) => {
    //     let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    //     this.router.navigate([returnUrl || '/']);
    //   },
    //   error: (err) => {
    //     this.invalidCredentials = true;
    //   },
    // });
  }
}
