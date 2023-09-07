import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected baseUrl = 'http://localhost:3000/api/';

  constructor() {}
}
