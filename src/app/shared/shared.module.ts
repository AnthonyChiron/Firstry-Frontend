import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavIconBtnComponent } from './components/nav-icon-btn/nav-icon-btn.component';
import { ModalComponent } from './components/modal/modal.component';
import { ScreenSizeService } from './services/screenSize/screen-size.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ChipsGroupComponent } from './components/chips-group/chips-group.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BtnComponent } from './components/btn/btn.component';

@NgModule({
  declarations: [
    ModalComponent,
    NavIconBtnComponent,
    BtnComponent,
    ChipsGroupComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    TabViewModule,
    ToggleButtonModule,
  ],
  providers: [ScreenSizeService],
  exports: [
    ModalComponent,
    NavIconBtnComponent,
    ButtonModule,
    CardModule,
    TabViewModule,
    ChipsGroupComponent,
    LoaderComponent,
    BtnComponent,
  ],
})
export class SharedModule {}
