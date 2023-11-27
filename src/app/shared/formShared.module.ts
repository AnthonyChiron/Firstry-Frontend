import { SharedModule } from 'src/app/shared/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InputImageComponent } from './components/form/input-image/input-image.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './components/form/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownAutocompleteComponent } from './components/form/dropdown-autocomplete/dropdown-autocomplete.component';
import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';
import { InputAdressComponent } from './components/form/input-adress/input-adress.component';
import { InputDateComponent } from './components/form/input-date/input-date.component';
import { InputTextareaComponent } from './components/form/input-textarea/input-textarea.component';

@NgModule({
  declarations: [
    InputTextComponent,
    InputDateComponent,
    InputTextareaComponent,
    DropdownAutocompleteComponent,
    InputAdressComponent,
    InputImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    ImageCropperModule,
    SharedModule,
  ],
  providers: [provideEnvironmentNgxMask()],
  exports: [
    InputTextComponent,
    DropdownAutocompleteComponent,
    ReactiveFormsModule,
    InputAdressComponent,
    InputDateComponent,
    InputTextareaComponent,
    InputImageComponent,
  ],
})
export class FormSharedModule {}
