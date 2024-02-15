import { PoolsComponent } from './pools/pools.component';
import { ContestInfosSummaryComponent } from './parameters/infos-summary/contest-infos-summary.component';
import { IsAuthGuard } from './../../shared/guards/IsAuth/is-auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarSecondaryComponent } from 'src/app/shared/components/basic/sidebar-secondary/sidebar-secondary.component';
import { CreateContestComponent } from './create-contest/create-contest.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormSharedModule } from 'src/app/shared/formShared.module';
import { ContestParametersDetailComponent } from './parameters/parameters-detail/contest-parameters-detail.component';
import { OverviewComponent } from './overview/overview.component';
import { CategoriesDetailsComponent } from './categories/categories-details/categories-details.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { CategoryCardComponent } from './categories/category-card/category-card.component';
import { ContestInfosCardComponent } from './parameters/contest-infos-card/contest-infos-card.component';
import { ContestSocialsCardComponent } from './parameters/contest-socials-card/contest-socials-card.component';
import { ContestBrandingCardComponent } from './parameters/contest-branding-card/contest-branding-card.component';
import { ContestRulesCardComponent } from './parameters/rules/contest-rules-card/contest-rules-card.component';
import { ContestListRulesCardComponent } from './parameters/rules/contest-list-rules-card/contest-list-rules-card.component';
import { ContestRulesFormatFormComponent } from './parameters/rules/contest-rules-card/contest-rules-format-form/contest-rules-format-form.component';
import { ContestRulesPointsFormComponent } from './parameters/rules/contest-rules-card/contest-rules-points-form/contest-rules-points-form.component';
import { ResultsComponent } from './results/results.component';
import { DangerZoneComponent } from './parameters/danger-zone/danger-zone.component';
import { IsOrganizerContestGuard } from 'src/app/shared/guards/IsOrganizerContest/is-organizer-contest-guard.service';
import { ContestComponent } from '../contests/contest/contest.component';
import { IsOrganizerGuard } from 'src/app/shared/guards/IsOrganizer/is-organizer-guard.service';
import { RiderStateHandlerComponent } from './pools/rider-state-handler/rider-state-handler.component';
import { OverviewRegistrationsComponent } from './overview/overview-registrations/overview-registrations.component';
import { PoolsHandlerComponent } from './pools/pools-handler/pools-handler.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ResultsHandlerComponent } from './results/results-handler/results-handler.component';
import { FormsModule } from '@angular/forms';
import { ContestStateComponent } from './overview/contest-state/contest-state.component';
import { LegalFilesComponent } from './parameters/legal-files/legal-files.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [IsAuthGuard, IsOrganizerGuard],
  },
  {
    path: ':contestId',
    component: DashboardComponent,
    canActivate: [IsAuthGuard, IsOrganizerGuard],
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [IsAuthGuard],
      },
      {
        path: 'categories',
        component: CategoriesDetailsComponent,
        canActivate: [IsAuthGuard],
      },
      {
        path: 'pools',
        component: PoolsComponent,
        canActivate: [IsAuthGuard],
      },
      {
        path: 'results',
        component: ResultsComponent,
        canActivate: [IsAuthGuard],
      },
      {
        path: 'parameters',
        component: ContestParametersDetailComponent,
        canActivate: [IsAuthGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
    ],
  },
  {
    path: 'preview/:contestId',
    component: ContestComponent,
    canActivate: [IsOrganizerContestGuard, IsAuthGuard],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarSecondaryComponent,
    CreateContestComponent,
    ListCategoriesComponent,
    ContestInfosSummaryComponent,
    ContestParametersDetailComponent,
    OverviewComponent,
    CategoriesDetailsComponent,
    CategoryCardComponent,
    ContestInfosCardComponent,
    ContestSocialsCardComponent,
    ContestBrandingCardComponent,
    ContestRulesCardComponent,
    ContestListRulesCardComponent,
    ContestRulesFormatFormComponent,
    ContestRulesPointsFormComponent,
    ResultsComponent,
    DangerZoneComponent,
    RiderStateHandlerComponent,
    OverviewRegistrationsComponent,
    PoolsHandlerComponent,
    PoolsComponent,
    ResultsHandlerComponent,
    ContestStateComponent,
    LegalFilesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    SharedModule,
    FormSharedModule,
    DragDropModule,
    FormsModule,
  ],
})
export class DashboardModule {}
