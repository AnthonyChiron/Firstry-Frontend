import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextComponent } from './components/form/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownAutocompleteComponent } from './components/form/dropdown-autocomplete/dropdown-autocomplete.component';
import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';
import { InputAdressComponent } from './components/form/input-adress/input-adress.component';

@NgModule({
  declarations: [
    InputTextComponent,
    DropdownAutocompleteComponent,
    InputAdressComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    SelectButtonModule,
    PasswordModule,
    CalendarModule,
    AutoCompleteModule,
    TabViewModule,
    DropdownModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
  ],
  providers: [provideEnvironmentNgxMask()],
  exports: [
    InputTextModule,
    SelectButtonModule,
    PasswordModule,
    CalendarModule,
    AutoCompleteModule,
    TabViewModule,
    DropdownModule,
    InputTextComponent,
    DropdownAutocompleteComponent,
    ReactiveFormsModule,
    InputAdressComponent,
  ],
})
export class FormSharedModule {}
