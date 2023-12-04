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
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { ContestParametersDetailComponent } from './parameters/parameters-detail/contest-parameters-detail.component';
import { OverviewComponent } from './overview/overview.component';
import { CategoriesDetailsComponent } from './categories/categories-details/categories-details.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryCardComponent } from './categories/category-card/category-card.component';
import { ContestInfosCardComponent } from './parameters/contest-infos-card/contest-infos-card.component';
import { ContestSocialsCardComponent } from './parameters/contest-socials-card/contest-socials-card.component';
import { ContestBrandingCardComponent } from './parameters/contest-branding-card/contest-branding-card.component';
import { ContestRulesCardComponent } from './parameters/contest-rules-card/contest-rules-card.component';
import { ContestListRulesCardComponent } from './parameters/contest-list-rules-card/contest-list-rules-card.component';

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
        data: { animation: 'Menu1' },
      },
      {
        path: ':contestId/create-category',
        component: CreateCategoryComponent,
        canActivate: [IsAuthGuard],
      },
      {
        path: ':contestId/planning',
        component: CategoriesDetailsComponent,
        canActivate: [IsAuthGuard],
      },
      {
        path: ':contestId/parameters',
        component: ContestParametersDetailComponent,
        canActivate: [IsAuthGuard],
      },
    ],
  },
  {
    path: 'create-contest',
    component: CreateContestComponent,
    canActivate: [IsAuthGuard],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarSecondaryComponent,
    CreateContestComponent,
    CreateCategoryComponent,
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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    SharedModule,
    FormSharedModule,
  ],
})
export class DashboardModule {}
