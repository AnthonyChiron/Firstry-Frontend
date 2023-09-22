import { Observable, firstValueFrom, map, startWith } from 'rxjs';
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
import { UsersService } from 'src/app/shared/data/UsersService/users.service';
import { FileUploadEvent, UploadEvent } from 'primeng/fileupload';

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
  photoFile: File;
  photoBlob: Blob;
  items: MenuItem[] | undefined;
  activeIndex: number = 1;
  emailAvailable: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerUserService: RegisterUserService,
    private authService: AuthService,
    private userService: UsersService,
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
    console.log(this.riderForm.value);
  }

  async next(form: FormGroup) {
    if (this.activeIndex == 0) {
      this.emailAvailable = <boolean>(
        await firstValueFrom(
          this.userService.isEmailAvailable(form.value.email)
        )
      );
    }
    if (form.invalid && !this.emailAvailable) form.markAllAsTouched();
    if (form.valid && this.emailAvailable) this.activeIndex++;
    // this.activeIndex++;
  }

  prev() {
    this.activeIndex--;
  }

  async uploadPhoto(event) {
    console.log(event);
    const blob = await fetch(event.objectUrl).then((r) => r.blob());
    console.log(blob);
    this.photoFile = new File([blob], 'test.png', { type: 'image/png' });
    console.log(this.photoFile);
  }

  submit() {
    console.log(this.photoFile);
    console.log(this.signUpForm.value);
    this.authService.signUp(this.signUpForm.value, this.photoFile).subscribe({
      next: (token) => {
        this.authService.saveToken(token);
        this.router.navigate(['/account/validateEmail']);
      },
      error: (err) => (this.invalidCredentials = true),
    });
  }
}
