import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'signup-credentials-form',
  templateUrl: './signup-credentials-form.component.html',
  styleUrls: ['./signup-credentials-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupCredentialsFormComponent implements OnInit {
  @Input() userForm: FormGroup;
  @Input() emailAvailable: boolean;

  constructor(protected fus: FormUtilityService) {}

  ngOnInit(): void {
    this.fus.setForm(this.userForm);
  }

  passwordMatch() {
    if (this.userForm.get('confirmPassword').dirty)
      return (
        this.userForm.value.password == this.userForm.value.confirmPassword
      );
    return true;
  }
}
