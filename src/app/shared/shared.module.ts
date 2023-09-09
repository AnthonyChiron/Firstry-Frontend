import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { IconBtnComponent } from './icon-btn/icon-btn.component';
import { BtnPrimaryComponent } from './btn-primary/btn-primary.component';

@NgModule({
  declarations: [
    ModalComponent,
    TabComponent,
    TabsComponent,
    IconBtnComponent,
    BtnPrimaryComponent,
  ],
  imports: [CommonModule],
  exports: [
    ModalComponent,
    TabComponent,
    TabsComponent,
    IconBtnComponent,
    BtnPrimaryComponent,
  ],
})
export class SharedModule {}
