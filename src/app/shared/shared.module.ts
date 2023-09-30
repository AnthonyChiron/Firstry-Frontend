import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavIconBtnComponent } from './components/basic/nav-icon-btn/nav-icon-btn.component';
import { ModalComponent } from './components/basic/modal/modal.component';
import { ScreenSizeService } from './services/screenSize/screen-size.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ChipsGroupComponent } from './components/form/chips-group/chips-group.component';
import { LoaderComponent } from './components/basic/loader/loader.component';
import { BtnComponent } from './components/basic/btn/btn.component';
import { NoteComponent } from './components/basic/note/note.component';
import { CapitalizeDirective } from './directives/capitalize.directive';
import { QuadrillageComponent } from './components/quadrillage/quadrillage.component';
import { CardComponent } from './components/basic/card/card.component';
import { ScrollingTextComponent } from './components/basic/scrolling-text/scrolling-text.component';
import { SocialsComponent } from './components/socials/socials.component';
import { TableComponent } from './components/basic/table/table.component';

@NgModule({
  declarations: [
    ModalComponent,
    NavIconBtnComponent,
    BtnComponent,
    ChipsGroupComponent,
    LoaderComponent,
    NoteComponent,
    CapitalizeDirective,
    QuadrillageComponent,
    CardComponent,
    ScrollingTextComponent,
    SocialsComponent,
    TableComponent,
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
    NoteComponent,
    CapitalizeDirective,
    QuadrillageComponent,
    CardComponent,
    ScrollingTextComponent,
    SocialsComponent,
    TableComponent,
  ],
})
export class SharedModule {}
