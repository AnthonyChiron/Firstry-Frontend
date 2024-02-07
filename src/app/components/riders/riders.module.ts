import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiderCardMediumComponent } from '../../shared/components/riders/rider-card-md/rider-card-md.component';
import { RouterModule, Routes } from '@angular/router';
import { RidersComponent } from './riders.component';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { RiderComponent } from './rider/rider.component';
import { RiderCardLargeComponent } from './card/rider-card-large/rider-card-large.component';
import { RiderSampleListComponent } from './rider/rider-sample-list/rider-sample-list.component';
import { RiderCardSampleComponent } from './card/rider-card-sample/rider-card-sample.component';
import { RiderResultComponent } from './rider/rider-result/rider-result.component';
import { FormSharedModule } from 'src/app/shared/formShared.module';

const ridersRoutes: Routes = [
  { path: '', component: RidersComponent },
  { path: ':id', component: RiderComponent },
];

@NgModule({
  declarations: [
    RidersComponent,
    RiderCardLargeComponent,
    RiderCardSampleComponent,
    RiderComponent,
    RiderSampleListComponent,
    RiderResultComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ridersRoutes),
    SharedModule,
    FormSharedModule,
  ],
  providers: [RidersService],
  exports: [RiderCardMediumComponent],
})
export class RidersModule {}
