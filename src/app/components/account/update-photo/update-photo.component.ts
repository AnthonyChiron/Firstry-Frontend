import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { OrganizersService } from 'src/app/shared/data/OrganizersService/organizers.service';
import heic2any from 'heic2any';

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
    private _organizerService: OrganizersService
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
    const file: File = event.target.files[0];
    // Vérifiez si le fichier est au format HEIC
    if (file.name.endsWith('.heic')) {
      try {
        // Convertissez le fichier HEIC en PNG
        const convertedBlob = <Blob>await heic2any({
          blob: file,
          toType: 'image/png',
          quality: 0.8, // vous pouvez ajuster la qualité ici
        });

        // Créez un nouvel objet File à partir du Blob
        const newFile = new File([convertedBlob], 'converted-image.png', {
          type: 'image/png',
        });

        const newEvent = {
          target: {
            files: [newFile],
            value: newFile.name,
            type: 'file',
          },
        };

        this.imageChangedEvent = newEvent;

        // Vous pouvez maintenant utiliser newFile avec image-cropper
        // Exemple : this.imageChangedEvent = { target: { files: [newFile] } };
      } catch (error) {
        console.error('Erreur lors de la conversion du fichier HEIC', error);
      }
    } else {
      // Traiter les fichiers non HEIC normalement
      console.log(file);
    }
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
