import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiderCardComponent } from './rider-card/rider-card.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { RidersComponent } from './riders.component';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { RiderComponent } from './rider/rider.component';

const ridersRoutes: Routes = [
  { path: '', component: RidersComponent },
  { path: ':id', component: RiderComponent },
];

@NgModule({
  declarations: [RidersComponent, RiderCardComponent, RiderComponent],
  imports: [CommonModule, RouterModule.forChild(ridersRoutes), SharedModule],
  providers: [RidersService],
})
export class RidersModule {}
