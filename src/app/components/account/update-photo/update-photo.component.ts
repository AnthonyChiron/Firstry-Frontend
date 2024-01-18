import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { OrganizersService } from 'src/app/shared/data/OrganizersService/organizers.service';
import { ImageUtilityService } from 'src/app/shared/services/ImageUtility/image-utility.service';

@Component({
  selector: 'update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.scss'],
})
export class UpdatePhotoComponent implements OnInit {
  userPhoto: string = '';

  imgConfirmed: boolean = false;
  isLoading: boolean = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  ratio: number = 4 / 5;

  constructor(
    protected _sanitizer: DomSanitizer,
    private _authService: AuthService,
    private _riderService: RidersService,
    private _organizerService: OrganizersService,
    private _imageCompressor: ImageUtilityService
  ) {}

  ngOnInit(): void {
    if (this._authService.isCurrentUserOrganizer()) {
      this.ratio = 1;
    }

    if (this._authService.isCurrentUserOrganizer())
      this.userPhoto = this._authService.getCurrentUser().organizer.photoUrl;
    else this.userPhoto = this._authService.getCurrentUser().rider.photoUrl;
  }

  async fileChangeEvent(event: any): Promise<void> {
    let file: File = event.target.files[0];
    // Vérifiez si le fichier est au format HEIC

    this.isLoading = true;
    console.log(file);
    if (file.name.endsWith('.heic'))
      file = await this._imageCompressor.convertHeicToPng(file);
    console.log(file);

    file = await this._imageCompressor.compressImg(file);
    console.log(file);
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

  test() {
    this._riderService.updatePhoto(
      this._authService.getCurrentUser().rider._id,
      'photoFile'
    );
  }

  async confirmImage() {
    // Ici, vous pouvez envoyer this.croppedImage au serveur ou quoi que ce soit.
    this.imgConfirmed = true;
    this.isLoading = true;
    const blob = await fetch(this.croppedImage.objectUrl).then((r) => r.blob());
    let photoFile = new File([blob], 'test.png', { type: 'image/png' });
    if (this._authService.isCurrentUserRider())
      this._riderService
        .updatePhoto(this._authService.getCurrentUser().riderId, photoFile)
        .subscribe((res) => {
          this.isLoading = false;
          this._authService.updateRider(res);
          this.userPhoto = this._authService.getCurrentUser().rider.photoUrl;
          this.imageChangedEvent = '';
          this.imgConfirmed = false;
        });
    else
      this._organizerService
        .updatePhoto(this._authService.getCurrentUser().organizerId, photoFile)
        .subscribe((res) => {
          this.isLoading = false;
          this._authService.updateOrganizer(res);
          this.userPhoto =
            this._authService.getCurrentUser().organizer.photoUrl;
          this.imageChangedEvent = '';
          this.imgConfirmed = false;
        });
  }
}
