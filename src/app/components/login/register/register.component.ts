import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/register.model';
import { rolesEnum } from 'src/app/constants/rolesEnum';
import { RegisterUserService } from 'src/app/shared/data/RegisterUserService/register-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerModel: RegisterModel = {
    email: '',
    password: '',
    role: rolesEnum.RIDER,
  };
  invalidCredentials: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerUserService: RegisterUserService
  ) {}

  submit() {
    this.registerUserService.create(this.registerModel).subscribe({
      next: (user) => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      },
      error: (err) => {
        this.invalidCredentials = true;
      },
    });
  }
}
