import { Observable, map, startWith } from 'rxjs';
import { CountryService } from './../../../shared/services/CountryService/country.service';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  invalidCredentials: Boolean = false;
  countries: any[] = [];
  userForm: FormGroup;
  riderForm: FormGroup;
  organizerForm: FormGroup;
  filteredOptions: Observable<any[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerUserService: RegisterUserService,
    private authService: AuthService,
    private countryService: CountryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.countryService.getAllCountry().subscribe((data: []) => {
      this.countries = data.sort((a: any, b: any) => {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
      console.log(data);
    });

    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: rolesEnum.RIDER,
    });

    this.riderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      nationality: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.organizerForm = this.fb.group({
      name: ['', Validators.required],
      siretNumber: ['', Validators.required],
    });

    this.filteredOptions = this.riderForm.controls[
      'nationality'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter((option) =>
      option.name.common.toLowerCase().includes(filterValue)
    );
  }

  test() {
    console.log(this.userForm.hasError('email'));
  }

  submit() {
    // console.log(this.signUpForm);
    // this.authService.signUp(this.signUpForm).subscribe({
    //   next: () => {
    //     this.authService
    //       .login({
    //         email: this.signUpForm.email,
    //         password: this.signUpForm.password,
    //       })
    //       .subscribe({
    //         next: (token) => {
    //           this.authService.saveToken(token);
    //           this.router.navigate(['/account/validEmail']);
    //         },
    //         error: (err) => {},
    //       });
    //   },
    //   error: (err) => (this.invalidCredentials = true),
    // });
  }
}
