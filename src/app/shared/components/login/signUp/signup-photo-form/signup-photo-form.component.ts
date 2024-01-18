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
import { ImageUtilityService } from 'src/app/shared/services/ImageUtility/image-utility.service';

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
  @Output() uploadPhoto = new EventEmitter<File>();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  maxFileSize = 4000;
  imgConfirmed: boolean = false;
  isLoading: boolean = false;
  ratio: number = 4 / 5;

  constructor(
    protected sanitizer: DomSanitizer,
    private _imgUtility: ImageUtilityService
  ) {}

  ngOnInit(): void {
    if (!this.signupTypeRider) {
      this.ratio = 1;
    }
  }

  async fileChangeEvent(event: any): Promise<void> {
    let file = await this._imgUtility.prepareImgForUpload(
      event.target.files[0]
    );

    const newEvent = {
      target: {
        files: [file],
        value: file.name,
        type: 'file',
      },
    };
    this.imageChangedEvent = newEvent;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event;
  }

  async confirmImage() {
    // Ici, vous pouvez envoyer this.croppedImage au serveur ou quoi que ce soit.
    const blob = await fetch(this.croppedImage.objectUrl).then((r) => r.blob());
    let photoFile = new File([blob], 'test.png', { type: 'image/png' });

    photoFile = await this._imgUtility.compressImg(photoFile);
    this.uploadPhoto.emit(photoFile);
    this.imgConfirmed = true;
  }

  onUpload(event) {
    console.log(event);
  }
}
