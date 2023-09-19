import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RemoveBgService {
  constructor(private http: HttpClient) {}

  // removeBg(photo) {
  //   const form = new FormData();
  //   form.append('image_file', photo);

  //   return fetch('https://clipdrop-api.co/remove-background/v1', {
  //     method: 'POST',
  //     headers: {
  //       'x-api-key':
  //         '16d88afb3b528400803c3ef7c94e68ca92c3911780544433172be6ab64c5c97069ebfca80e15ed078b036e9c92f90bc8',
  //     },
  //     body: form,
  //   });
  // }

  removeBg(imageFile: File) {
    const formData = new FormData();
    formData.append('image_file', imageFile);

    return fetch('https://clipdrop-api.co/remove-background/v1', {
      method: 'POST',
      headers: {
        'x-api-key':
          '16d88afb3b528400803c3ef7c94e68ca92c3911780544433172be6ab64c5c97069ebfca80e15ed078b036e9c92f90bc8',
      },
      body: formData,
    });
  }
}
