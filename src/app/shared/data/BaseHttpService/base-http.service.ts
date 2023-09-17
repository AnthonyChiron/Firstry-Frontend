import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected baseUrl =
    'https://us-central1-firstry-7e136.cloudfunctions.net/api/';
  protected baseUrlProd = 'http://localhost:3000/api/';

  constructor() {}
}
