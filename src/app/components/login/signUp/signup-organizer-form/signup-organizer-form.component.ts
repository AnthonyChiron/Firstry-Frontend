import { Component, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'signup-organizer-form',
  templateUrl: './signup-organizer-form.component.html',
  styleUrls: ['./signup-organizer-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupOrganizerFormComponent {
  @Input() organizerForm: FormGroup;

  constructor() {}
}
