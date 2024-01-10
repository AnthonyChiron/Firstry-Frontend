import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileUploadEvent } from 'primeng/fileupload';
import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() onUploadImage = new EventEmitter<FileUploadEvent>();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  maxFileSize = 4000;
  isLoading: boolean = false;
  isImageCroppring: boolean = false;
  imgFailed: boolean = false;

  constructor(protected sanitizer: DomSanitizer) {}

  async fileChangeEvent(event: any): Promise<void> {
    this.isImageCroppring = true;
    this.isLoading = true;
    try {
      this.imageChangedEvent = event;
      this.isLoading = false;
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'arrière-plan : ",
        error
      );
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event;
  }

  imageLoaded() {
    // afficher un message si nécessaire
  }

  loadImageFailed() {
    // afficher un message d'erreur
    this.imgFailed = true;
  }

  confirmImage() {
    // Ici, vous pouvez envoyer this.croppedImage au serveur ou quoi que ce soit.
    console.log(this.croppedImage);
    this.isImageCroppring = false;
    this.imageChangedEvent = '';
    this.img = '';
    this.onUploadImage.emit(this.croppedImage);
  }

  onUpload(event) {
    console.log(event);
  }
}
