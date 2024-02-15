import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected baseUrl = environment.backendUrl;
  constructor() {}
}
