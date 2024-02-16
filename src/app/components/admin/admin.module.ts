import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from 'src/app/shared/formShared.module';
import { AdminComponent } from './admin.component';
import { IsAuthGuard } from 'src/app/shared/guards/IsAuth/is-auth-guard.service';
import { IsAdminGuard } from 'src/app/shared/guards/IsAdmin/is-admin-guard.service';
import { AdminContestsHandlerComponent } from './admin-contests-handler/admin-contests-handler.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminReportsHandlerComponent } from './admin-reports-handler/admin-reports-handler.component';
import { AdminRidersHandlerComponent } from './admin-riders-handler/admin-riders-handler.component';
import { NgChartsModule } from 'ng2-charts';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [IsAuthGuard, IsAdminGuard],
    children: [
      {
        path: 'overview',
        component: AdminOverviewComponent,
        canActivate: [IsAuthGuard, IsAdminGuard],
      },
      {
        path: 'riders',
        component: AdminRidersHandlerComponent,
        canActivate: [IsAuthGuard, IsAdminGuard],
      },
      {
        path: 'contests',
        component: AdminContestsHandlerComponent,
        canActivate: [IsAuthGuard, IsAdminGuard],
      },
      {
        path: 'reports',
        component: AdminReportsHandlerComponent,
        canActivate: [IsAuthGuard, IsAdminGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminContestsHandlerComponent,
    AdminOverviewComponent,
    AdminReportsHandlerComponent,
    AdminRidersHandlerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    SharedModule,
    FormSharedModule,
    FormsModule,
    NgChartsModule,
  ],
})
export class AdminModule {}
