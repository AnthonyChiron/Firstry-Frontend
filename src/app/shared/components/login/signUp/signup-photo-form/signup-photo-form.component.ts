import { FileUploadEvent, UploadEvent } from 'primeng/fileupload';
import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'signup-photo-form',
  templateUrl: './signup-photo-form.component.html',
  styleUrls: ['./signup-photo-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupPhotoFormComponent implements OnInit {
  @Input() photoForm: FormGroup;
  @Input() photoFile: File;
  @Input() signupTypeRider: boolean = true;
  @Output() uploadPhoto = new EventEmitter<FileUploadEvent>();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  maxFileSize = 4000;
  imgConfirmed: boolean = false;
  isLoading: boolean = false;
  ratio: number = 4 / 5;

  constructor(protected sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (!this.signupTypeRider) {
      this.ratio = 1;
    }
  }

  async fileChangeEvent(event: any): Promise<void> {
    const file: File = event.target.files[0];
    // this.imageChangedEvent = event;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event;
  }

  imageLoaded() {
    // afficher un message si nécessaire
  }

  cropperReady() {
    // cropper est prêt
  }

  loadImageFailed() {
    // afficher un message d'erreur
  }

  confirmImage() {
    // Ici, vous pouvez envoyer this.croppedImage au serveur ou quoi que ce soit.
    console.log(this.croppedImage);
    this.uploadPhoto.emit(this.croppedImage);
    this.imgConfirmed = true;
  }

  onUpload(event) {
    console.log(event);
  }
}
