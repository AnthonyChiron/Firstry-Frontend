import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestsComponent } from './contests.component';
import { RouterModule, Routes } from '@angular/router';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ContestCardComponent } from './contest-card/contest-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContestComponent } from './contest/contest.component';

const contestsRoutes: Routes = [
  { path: '', component: ContestsComponent },
  { path: ':id', component: ContestComponent },
];

@NgModule({
  declarations: [ContestsComponent, ContestCardComponent, ContestComponent],
  imports: [CommonModule, RouterModule.forChild(contestsRoutes), SharedModule],
  providers: [ContestsService],
})
export class ContestsModule {}
