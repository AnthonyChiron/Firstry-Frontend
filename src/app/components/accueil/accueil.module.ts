import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { AccueilComponent } from './accueil.component';
import { AccueilPresContestComponent } from './accueil-pres-contest/accueil-pres-contest.component';
import { AccueilSelectContestRiderPresComponent } from './accueil-select-contest-rider-pres/accueil-select-contest-rider-pres.component';
import { AccueilPresRiderComponent } from './accueil-pres-rider/accueil-pres-rider.component';

const accueilRoutes: Routes = [{ path: '', component: AccueilComponent }];

@NgModule({
  declarations: [
    AccueilComponent,
    AccueilPresContestComponent,
    AccueilSelectContestRiderPresComponent,
    AccueilPresRiderComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(accueilRoutes), SharedModule],
  providers: [RidersService],
})
export class AccueilModule {}
