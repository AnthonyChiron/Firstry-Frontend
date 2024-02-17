import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestsComponent } from './contests.component';
import { RouterModule, Routes } from '@angular/router';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ContestCardComponent } from './contest-card/contest-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContestComponent } from './contest/contest.component';
import { ContestOverviewComponent } from './contest/contest-overview/contest-overview.component';
import { IsAuthGuard } from 'src/app/shared/guards/IsAuth/is-auth-guard.service';
import { ContestRegisterComponent } from './contest/contest-register/contest-register.component';
import { ContestResultsComponent } from './contest/contest-results/contest-results.component';
import { ContestPlanningComponent } from './contest/contest-planning/contest-planning.component';
import { LoginModule } from '../../shared/components/login/login.module';
import { PaiementModule } from 'src/app/shared/components/paiement/paiement.module';
import { IsOrganizerContestGuard } from 'src/app/shared/guards/IsOrganizerContest/is-organizer-contest-guard.service';
import { IsContestPublishedGuard } from 'src/app/shared/guards/IsContestPublished/is-contest-published-guard.service';
import { ResultTableComponent } from './contest/contest-results/result-table/result-table.component';

const contestsRoutes: Routes = [
  { path: '', component: ContestsComponent },
  {
    path: ':id',
    component: ContestComponent,
    canActivate: [IsContestPublishedGuard],
    children: [
      {
        path: 'overview',
        component: ContestOverviewComponent,
      },
      {
        path: 'register',
        component: ContestRegisterComponent,
      },
      {
        path: 'results',
        component: ContestResultsComponent,
      },
      {
        path: 'planning',
        component: ContestPlanningComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
    ],
  },
  {
    path: 'preview/:id',
    component: ContestComponent,
    canActivate: [],
    children: [
      {
        path: 'overview',
        component: ContestOverviewComponent,
      },
      {
        path: 'register',
        component: ContestRegisterComponent,
      },
      {
        path: 'results',
        component: ContestResultsComponent,
      },
      {
        path: 'planning',
        component: ContestPlanningComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
    ],
  },
];

@NgModule({
  declarations: [
    ContestsComponent,
    ContestCardComponent,
    ContestComponent,
    ContestOverviewComponent,
    ContestRegisterComponent,
    ContestResultsComponent,
    ContestPlanningComponent,
    ResultTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(contestsRoutes),
    SharedModule,
    LoginModule,
    PaiementModule,
  ],
  providers: [ContestsService],
})
export class ContestsModule {}
