import { SharedModule } from 'src/app/shared/shared.module';
import { IsAuthGuard } from '../../shared/guards/IsAuth/is-auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from 'src/app/shared/guards/IsAdmin/is-admin-guard.service';
import { DashboardLiveComponent } from './dashboard-live/dashboard-live.component';
import { LiveOverviewComponent } from './live-overview/live-overview.component';
import { LiveTimerComponent } from './live-timer/live-timer.component';

const liveRoutes: Routes = [
  {
    path: '',
    component: DashboardLiveComponent,
    canActivate: [IsAuthGuard, IsAdminGuard],
  },
  {
    path: ':contestId',
    component: DashboardLiveComponent,
    canActivate: [IsAuthGuard, IsAdminGuard],
    children: [
      {
        path: 'overview',
        component: LiveOverviewComponent,
        canActivate: [IsAuthGuard],
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
  declarations: [DashboardLiveComponent, LiveOverviewComponent, LiveTimerComponent],
  imports: [CommonModule, RouterModule.forChild(liveRoutes), SharedModule],
})
export class LiveModule {}
