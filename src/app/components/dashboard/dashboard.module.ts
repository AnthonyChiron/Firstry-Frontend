import { ContestInfosSummaryComponent } from './infos/infos-summary/contest-infos-summary.component';
import { IsAuthGuard } from './../../shared/guards/IsAuth/is-auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarSecondaryComponent } from 'src/app/shared/components/basic/sidebar-secondary/sidebar-secondary.component';
import { CreateContestComponent } from './create-contest/create-contest.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormSharedModule } from 'src/app/shared/formShared.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ContestInfosDetailComponent } from './infos/infos-detail/contest-infos-detail.component';
import { OverviewComponent } from './overview/overview.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [IsAuthGuard],
    children: [
      {
        path: ':contestId/overview',
        component: OverviewComponent,
        canActivate: [IsAuthGuard],
      },
      {
        path: ':contestId/infos',
        component: ContestInfosDetailComponent,
        canActivate: [IsAuthGuard],
      },
    ],
  },
  {
    path: 'create-contest',
    component: CreateContestComponent,
    canActivate: [IsAuthGuard],
  },
  {
    path: ':contestId/create-category',
    component: CreateCategoryComponent,
    canActivate: [IsAuthGuard],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarSecondaryComponent,
    CreateContestComponent,
    CreateCategoryComponent,
    ListCategoryComponent,
    ContestInfosSummaryComponent,
    ContestInfosDetailComponent,
    OverviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    SharedModule,
    FormSharedModule,
  ],
})
export class DashboardModule {}
