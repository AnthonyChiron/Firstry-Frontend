import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestsComponent } from './contests.component';
import { ContestsService } from 'src/app/services/ContestsService/contests.service';
import { RouterModule, Routes } from '@angular/router';

const contestsRoutes: Routes = [{ path: '', component: ContestsComponent }];

@NgModule({
  declarations: [ContestsComponent],
  imports: [CommonModule, RouterModule.forChild(contestsRoutes)],
  providers: [ContestsService],
})
export class ContestsModule {}
