import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  baseUrl = 'https://restcountries.com/v3.1/';

  constructor(protected http: HttpClient) {}

  getAllCountry() {
    return this.http.get(this.baseUrl + 'all?fields=name,flags').pipe(
      map((countries: any[]) =>
        countries.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        })
      )
    );
  }
}
