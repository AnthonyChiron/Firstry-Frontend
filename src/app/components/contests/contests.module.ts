import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestsComponent } from './contests.component';
import { RouterModule, Routes } from '@angular/router';
import { ContestsService } from 'src/app/services/data/ContestsService/contests.service';

const contestsRoutes: Routes = [{ path: '', component: ContestsComponent }];

@NgModule({
  declarations: [ContestsComponent],
  imports: [CommonModule, RouterModule.forChild(contestsRoutes)],
  providers: [ContestsService],
})
export class ContestsModule {}
