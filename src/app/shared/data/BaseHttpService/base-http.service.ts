import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected baseUrlProd = 'http://back:3000/api/';
  protected baseUrlLocal = 'http://localhost:3000/api/';

  protected baseUrl = this.baseUrlProd;

  constructor() {
    if (environment.production) {
      this.baseUrl = this.baseUrlProd;
    }
  }
}
