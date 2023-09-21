import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputTextComponent],
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
  ],
  providers: [],
  exports: [
    InputTextModule,
    SelectButtonModule,
    PasswordModule,
    CalendarModule,
    AutoCompleteModule,
    TabViewModule,
    DropdownModule,
    InputTextComponent,
  ],
})
export class FormSharedModule {}
