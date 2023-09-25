import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiderCardMediumComponent } from './rider-card-md/rider-card-md.component';
import { RouterModule, Routes } from '@angular/router';
import { RidersComponent } from './riders.component';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { RiderComponent } from './rider/rider.component';
import { RiderCardLargeComponent } from './rider-card-large/rider-card-large.component';

const ridersRoutes: Routes = [
  { path: '', component: RidersComponent },
  { path: ':id', component: RiderComponent },
];

@NgModule({
  declarations: [
    RidersComponent,
    RiderCardMediumComponent,
    RiderCardLargeComponent,
    RiderComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(ridersRoutes), SharedModule],
  providers: [RidersService],
})
export class RidersModule {}
