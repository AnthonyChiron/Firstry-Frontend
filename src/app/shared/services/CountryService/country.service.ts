import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  baseUrl = 'https://restcountries.com/v3.1/';

  constructor(protected http: HttpClient) {}

  getAllCountry() {
    return this.http.get(this.baseUrl + 'all?fields=name,flags');
  }
}
