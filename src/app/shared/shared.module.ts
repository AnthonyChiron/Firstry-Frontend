import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavIconBtnComponent } from './components/nav-icon-btn/nav-icon-btn.component';
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
    NavIconBtnComponent,
    BtnPrimaryComponent,
  ],
  imports: [CommonModule],
  providers: [ScreenSizeService],
  exports: [
    ModalComponent,
    TabComponent,
    TabsComponent,
    NavIconBtnComponent,
    BtnPrimaryComponent,
  ],
})
export class SharedModule {}
