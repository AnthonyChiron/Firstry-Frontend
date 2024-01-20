import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { AccueilComponent } from './accueil.component';

const accueilRoutes: Routes = [{ path: '', component: AccueilComponent }];

@NgModule({
  declarations: [AccueilComponent],
  imports: [CommonModule, RouterModule.forChild(accueilRoutes), SharedModule],
  providers: [RidersService],
})
export class AccueilModule {}
