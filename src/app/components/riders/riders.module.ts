import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiderCardComponent } from './rider-card/rider-card.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { RidersService } from 'src/app/services/data/RidersService/riders.service';
import { RidersComponent } from './riders.component';

const ridersRoutes: Routes = [{ path: '', component: RidersComponent }];

@NgModule({
  declarations: [RidersComponent, RiderCardComponent],
  imports: [CommonModule, RouterModule.forChild(ridersRoutes)],
  providers: [RidersService],
})
export class RidersModule {}
