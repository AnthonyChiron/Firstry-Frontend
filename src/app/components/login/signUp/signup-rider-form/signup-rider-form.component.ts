import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { sportsEnum } from 'src/app/constants/sportsEnum';
import { CountryService } from 'src/app/shared/services/CountryService/country.service';

@Component({
  selector: 'signup-rider-form',
  templateUrl: './signup-rider-form.component.html',
  styleUrls: ['./signup-rider-form.component.scss'],
})
export class SignupRiderFormComponent implements OnInit {
  @Input() riderForm: FormGroup;
  filteredCountries: any[];
  countries: any[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getAllCountry().subscribe((data: []) => {
      this.countries = data.sort((a: any, b: any) => {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
    });
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.common.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}