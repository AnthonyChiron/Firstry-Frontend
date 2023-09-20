import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected baseUrlProd =
    'https://us-central1-firstry-7e136.cloudfunctions.net/api/';
  protected baseUrlLocal = 'http://localhost:3000/api/';

  protected baseUrl = this.baseUrlProd;
  constructor() {}
}
