import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconBtnComponent } from './components/icon-btn/icon-btn.component';
import { BtnPrimaryComponent } from './components/btn-primary/btn-primary.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabComponent } from './components/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ScreenSizeService } from './services/screenSize/screen-size.service';

@NgModule({
  declarations: [
    ModalComponent,
    TabComponent,
    TabsComponent,
    IconBtnComponent,
    BtnPrimaryComponent,
  ],
  imports: [CommonModule],
  providers: [ScreenSizeService],
  exports: [
    ModalComponent,
    TabComponent,
    TabsComponent,
    IconBtnComponent,
    BtnPrimaryComponent,
  ],
})
export class SharedModule {}
