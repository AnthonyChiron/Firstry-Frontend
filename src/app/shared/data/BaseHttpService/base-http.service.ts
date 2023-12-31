import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected baseUrlProd =
    'https://us-central1-firstry-7e136.cloudfunctions.net/api/';
  protected baseUrlLocal = 'http://localhost:3000/api/';

  protected baseUrl = this.baseUrlLocal;

  constructor() {
    if (environment.production) {
      this.baseUrl = this.baseUrlProd;
    }
  }
}
