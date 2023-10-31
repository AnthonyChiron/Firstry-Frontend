import {
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Address } from 'src/app/models/adress.model';

@Component({
  selector: 'input-adress',
  templateUrl: './input-adress.component.html',
  styleUrls: ['./input-adress.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputAdressComponent,
      multi: true,
    },
  ],
})
export class InputAdressComponent implements AfterViewInit, OnChanges {
  @Input() label: string = '';
  @Input() edit: boolean = true;
  private onChange: any = () => {};
  private onTouched: any = () => {};
  isInit: boolean = false;

  isAddressSelected: boolean = false;
  value: any;

  constructor(private ngZone: NgZone, private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['edit'] && changes['edit'].currentValue == true) {
      this.initAutoComplete();
    }
  }

  ngAfterViewInit(): void {
    this.initAutoComplete();
  }

  initAutoComplete(): void {
    const inputElement = document.getElementById(
      'autocomplete'
    ) as HTMLInputElement;
    console.log(this.edit);
    console.log(inputElement);

    if (!inputElement) return;

    const autocomplete = new google.maps.places.Autocomplete(inputElement);

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        const address = {
          address: place.formatted_address,
          postalCode: '',
          city: '',
          country: '',
        };

        for (const component of place.address_components) {
          const componentType = component.types[0];
          switch (componentType) {
            case 'postal_code': {
              address.postalCode = component.long_name;
              break;
            }
            case 'locality': {
              address.city = component.long_name;
              break;
            }
            case 'country': {
              address.country = component.long_name;
              break;
            }
          }
        }
        this.isAddressSelected = true;

        this.onChange(address);
      });
    });
  }

  writeValue(value: Address): void {
    // Mettez à jour la valeur de votre composant
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    const inputElement = document.getElementById(
      'autocomplete'
    ) as HTMLInputElement;
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      !this.isAddressSelected
    ) {
      this.isAddressSelected = false;
      this.onTouched();
      if (inputElement) inputElement.value = '';
    }
  }
}
