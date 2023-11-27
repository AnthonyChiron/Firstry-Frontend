import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
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
  @Input() imgFile: File;
  @Input() img: string = null;
  @Output() onUploadImage = new EventEmitter<any>();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  maxFileSize = 4000;
  imgConfirmed: boolean = false;
  isLoading: boolean = false;

  constructor(protected sanitizer: DomSanitizer) {}

  async fileChangeEvent(event: any): Promise<void> {
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
  }

  confirmImage() {
    // Ici, vous pouvez envoyer this.croppedImage au serveur ou quoi que ce soit.
    console.log(this.croppedImage);
    this.onUploadImage.emit(this.croppedImage);
    this.imgConfirmed = true;
  }

  onUpload(event) {
    console.log(event);
  }
}
