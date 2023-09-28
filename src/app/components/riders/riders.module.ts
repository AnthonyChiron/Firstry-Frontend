import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiderCardMediumComponent } from './card/rider-card-md/rider-card-md.component';
import { RouterModule, Routes } from '@angular/router';
import { RidersComponent } from './riders.component';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { RiderComponent } from './rider/rider.component';
import { RiderCardLargeComponent } from './card/rider-card-large/rider-card-large.component';
import { RiderSampleListComponent } from './list/rider-sample-list/rider-sample-list.component';
import { RiderCardSampleComponent } from './card/rider-card-sample/rider-card-sample.component';

const ridersRoutes: Routes = [
  { path: '', component: RidersComponent },
  { path: ':id', component: RiderComponent },
];

@NgModule({
  declarations: [
    RidersComponent,
    RiderCardMediumComponent,
    RiderCardLargeComponent,
    RiderCardSampleComponent,
    RiderComponent,
    RiderSampleListComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(ridersRoutes), SharedModule],
  providers: [RidersService],
})
export class RidersModule {}
