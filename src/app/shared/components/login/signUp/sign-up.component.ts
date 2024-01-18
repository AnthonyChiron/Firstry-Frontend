import { Observable, firstValueFrom, map, startWith } from 'rxjs';
import { CountryService } from '../../../services/CountryService/country.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
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
  riderFormTouched: boolean = false;
  organizerFormTouched: boolean = false;
  photoFile: File;
  activeIndex: number = 0;
  emailAvailable: boolean = true;
  isLoading: boolean = false;
  @Output() registered: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UsersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
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
      location: ['', Validators.required],
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

  test() {}

  async next(form: FormGroup) {
    if (this.activeIndex == 0) {
      this.emailAvailable = <boolean>(
        await firstValueFrom(
          this.userService.isEmailAvailable(form.value.email)
        )
      );
    }
    if (this.activeIndex == 1) {
      this.organizerFormTouched = true;
      this.riderFormTouched = true;
    }
    if (form.invalid && !this.emailAvailable) form.markAllAsTouched;
    if (form.valid && this.emailAvailable) this.activeIndex++;
    // this.activeIndex++;
  }

  prev() {
    this.activeIndex--;
  }

  async uploadPhoto(event) {
    this.photoFile = event;
  }

  submit() {
    this.isLoading = true;
    this.authService.signUp(this.signUpForm.value, this.photoFile).subscribe({
      next: (token) => {
        this.isLoading = false;
        this.authService.saveToken(token);
        this.registered.emit();

        this.router.navigate(['/account/validateEmail']);
      },
      error: (err) => {
        this.isLoading = false;
        this.invalidCredentials = true;
      },
    });
  }
}
