import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileUploadEvent } from 'primeng/fileupload';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageUtilityService } from 'src/app/shared/services/ImageUtility/image-utility.service';

@Component({
  selector: 'input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss'],
})
export class InputImageComponent {
  @Input() label: string;
  @Input() btnLabel: string;
  @Input() btnLabelDetail: string;
  @Input() ratio: number = 1;
  @Input() size: number;
  @Input() img: string = '';
  @Output() onUploadImage = new EventEmitter<File>();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  maxFileSize = 4000;
  isLoading: boolean = false;
  isImageCroppring: boolean = false;
  imgFailed: boolean = false;

  constructor(
    protected sanitizer: DomSanitizer,
    private _imgUtility: ImageUtilityService
  ) {}

  async fileChangeEvent(event: any): Promise<void> {
    this.isLoading = true;
    this.isImageCroppring = true;
    let file = await this._imgUtility.prepareImgForUpload(
      event.target.files[0]
    );
    this.isLoading = false;

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

  loadImageFailed() {
    // afficher un message d'erreur
    this.imgFailed = true;
  }

  async confirmImage() {
    const blob = await fetch(this.croppedImage.objectUrl).then((r) => r.blob());
    let photoFile = new File([blob], 'test.png', { type: 'image/png' });

    photoFile = await this._imgUtility.compressImg(photoFile);

    this.imageChangedEvent = '';
    this.img = '';
    this.onUploadImage.emit(photoFile);
    this.isImageCroppring = false;
  }
}
