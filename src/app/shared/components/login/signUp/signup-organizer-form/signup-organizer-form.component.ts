import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'signup-organizer-form',
  templateUrl: './signup-organizer-form.component.html',
  styleUrls: ['./signup-organizer-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupOrganizerFormComponent implements OnInit {
  @Input() organizerForm: FormGroup;
  @Input() touched: boolean = false;

  constructor(protected fus: FormUtilityService) {}

  ngOnInit(): void {
    this.fus.setForm(this.organizerForm);
  }
}
