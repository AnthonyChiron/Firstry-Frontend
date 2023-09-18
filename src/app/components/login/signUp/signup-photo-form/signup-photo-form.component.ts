import { Component, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'signup-photo-form',
  templateUrl: './signup-photo-form.component.html',
  styleUrls: ['./signup-photo-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupPhotoFormComponent {
  @Input() photoForm: FormGroup;
  maxFileSize = 4000;

  constructor() {}

  onUpload(event: UploadEvent) {
    console.log(event);
  }
}
