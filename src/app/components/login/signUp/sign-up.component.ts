import { Observable, map, startWith } from 'rxjs';
import { CountryService } from './../../../shared/services/CountryService/country.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpModel as SignUpModel } from 'src/app/models/signUp.model';
import { rolesEnum } from 'src/app/constants/rolesEnum';
import { RegisterUserService } from 'src/app/shared/data/RegisterUserService/register-user.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {
  invalidCredentials: Boolean = false;
  credentialsForm: FormGroup;
  signUpForm: FormGroup;
  riderForm: FormGroup;
  organizerForm: FormGroup;
  photoForm: FormGroup;
  items: MenuItem[] | undefined;
  activeIndex: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerUserService: RegisterUserService,
    private authService: AuthService,
    private countryService: CountryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Login',
      },
      {
        label: 'Infos',
      },
      {
        label: 'Smile',
      },
    ];

    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]],
      role: rolesEnum.RIDER,
    });

    this.riderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      nationality: ['', Validators.required],
      city: ['', Validators.required],
      sports: ['', Validators.required],
    });

    this.organizerForm = this.fb.group({
      name: ['', Validators.required],
      siretNumber: ['', Validators.required],
    });

    this.photoForm = this.fb.group({
      photo: ['', Validators.required],
    });

    this.signUpForm = this.fb.group({
      user: this.credentialsForm,
      rider: this.riderForm,
      organizer: this.organizerForm,
    });
  }

  test() {
    console.log(this.credentialsForm.value);
  }

  next(form: FormGroup) {
    if (form.invalid) form.markAllAsTouched();
    if (form.valid) this.activeIndex++;
  }

  prev() {
    this.activeIndex--;
  }

  submit() {
    console.log(this.signUpForm.value);
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: (token) => {
        this.authService.saveToken(token);
        this.router.navigate(['/account/validateEmail']);
      },
      error: (err) => (this.invalidCredentials = true),
    });
  }
}
