import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
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
import { CapitalizePipe } from './pipe/capitalize.pipe';
import { QuadrillageComponent } from './components/quadrillage/quadrillage.component';
import { CardComponent } from './components/basic/card/card.component';
import { ScrollingTextComponent } from './components/basic/scrolling-text/scrolling-text.component';
import { SocialsComponent } from './components/socials/socials.component';
import { TableComponent } from './components/basic/table/table.component';
import { DropdownComponent } from './components/basic/dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { FormatDateJJMMDirective } from './directives/format-date-jjmm.directive';
import { InfoTagComponent } from './components/basic/info-tag/info-tag.component';
import { MapsCardComponent } from './components/maps-card/maps-card.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PlanningComponent } from './components/basic/planning/planning.component';

@NgModule({
  declarations: [
    ModalComponent,
    PlanningComponent,
    NavIconBtnComponent,
    BtnComponent,
    ChipsGroupComponent,
    LoaderComponent,
    NoteComponent,
    CapitalizePipe,
    FormatDateJJMMDirective,
    QuadrillageComponent,
    CardComponent,
    ScrollingTextComponent,
    SocialsComponent,
    TableComponent,
    DropdownComponent,
    InfoTagComponent,
    MapsCardComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    TabViewModule,
    ToggleButtonModule,
    RouterModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
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
    CapitalizePipe,
    QuadrillageComponent,
    CardComponent,
    ScrollingTextComponent,
    SocialsComponent,
    TableComponent,
    DropdownComponent,
    FormatDateJJMMDirective,
    InfoTagComponent,
    MapsCardComponent,
    PlanningComponent,
  ],
})
export class SharedModule {}
