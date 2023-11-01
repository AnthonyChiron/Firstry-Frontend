import { DomSanitizer } from '@angular/platform-browser';
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
  @Input() ratio: number = 1;
  @Input() size: number;
  @Input() imgFile: File;
  @Output() uploadPhoto = new EventEmitter<FileUploadEvent>();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  maxFileSize = 4000;
  imgConfirmed: boolean = false;
  isLoading: boolean = false;

  constructor(protected sanitizer: DomSanitizer) {}

  async fileChangeEvent(event: any): Promise<void> {
    const file: File = event.target.files[0];

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
    this.uploadPhoto.emit(this.croppedImage);
    this.imgConfirmed = true;
  }

  onUpload(event) {
    console.log(event);
  }
}
