import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavIconBtnComponent } from './components/nav-icon-btn/nav-icon-btn.component';
import { BtnPrimaryComponent } from './components/btn-primary/btn-primary.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabComponent } from './components/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ScreenSizeService } from './services/screenSize/screen-size.service';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    ModalComponent,
    TabComponent,
    TabsComponent,
    NavIconBtnComponent,
    BtnPrimaryComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    StepsModule,
    CardModule,
    InputTextModule,
    SelectButtonModule,
    PasswordModule,
    CalendarModule,
    AutoCompleteModule,
    FileUploadModule,
    CheckboxModule,
  ],
  providers: [ScreenSizeService],
  exports: [
    ModalComponent,
    TabComponent,
    TabsComponent,
    NavIconBtnComponent,
    BtnPrimaryComponent,
    ButtonModule,
    StepsModule,
    CardModule,
    InputTextModule,
    SelectButtonModule,
    PasswordModule,
    CalendarModule,
    AutoCompleteModule,
    FileUploadModule,
    CheckboxModule,
  ],
})
export class SharedModule {}
