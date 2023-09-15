import { Component, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'signup-credentials-form',
  templateUrl: './signup-credentials-form.component.html',
  styleUrls: ['./signup-credentials-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupCredentialsFormComponent {
  @Input() userForm: FormGroup;

  constructor() {}
}
