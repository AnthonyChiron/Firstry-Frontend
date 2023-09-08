import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiderCardComponent } from './rider-card/rider-card.component';
import { RidersComponent } from './riders.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RidersService } from 'src/app/services/RidersService/riders.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

const ridersRoutes: Routes = [{ path: '', component: RidersComponent }];

@NgModule({
  declarations: [RidersComponent, RiderCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ridersRoutes),
  ],
  providers: [RidersService],
})
export class RidersModule {}
