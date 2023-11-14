import { FormUtilityService } from './../../../../shared/services/FormUtility/form-utility.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CountryService } from 'src/app/shared/services/CountryService/country.service';

@Component({
  selector: 'signup-rider-form',
  templateUrl: './signup-rider-form.component.html',
  styleUrls: ['./signup-rider-form.component.scss'],
})
export class SignupRiderFormComponent implements OnInit {
  @Input() riderForm: FormGroup;
  @Input() touched: boolean = false;
  filteredCountries: any[];
  countries: any[] = [];

  constructor(
    private countryService: CountryService,
    protected fus: FormUtilityService
  ) {}

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
      this.countries = this.countries.map((country) => {
        return { label: country.name.common, value: country };
      });
    });
    this.fus.setForm(this.riderForm);
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
