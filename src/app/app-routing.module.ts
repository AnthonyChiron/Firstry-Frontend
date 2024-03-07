import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { LoginComponent } from './shared/components/login/login.component';
import { IsNotAuthGuard } from './shared/guards/IsNotAuth/is-not-auth.service';
import { MentionsLegalComponent } from './components/mentions-legal/mentions-legal.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/accueil/accueil.module').then(
            (m) => m.AccueilModule
          ),
      },
      {
        path: 'riders',
        loadChildren: () =>
          import('./components/riders/riders.module').then(
            (m) => m.RidersModule
          ),
      },
      {
        path: 'contests',
        loadChildren: () =>
          import('./components/contests/contests.module').then(
            (m) => m.ContestsModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./components/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'live',
        loadChildren: () =>
          import('./components/live/live.module').then((m) => m.LiveModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./components/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      {
        path: 'mentions-legal',
        component: MentionsLegalComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [IsNotAuthGuard],
      },
      {
        path: 'register',
        component: LoginComponent,
        canActivate: [IsNotAuthGuard],
      },
      { path: 'access-denied', component: AccessDeniedComponent },
      { path: 'not-found', component: NotFoundComponent },
    ],
  },
  {
    path: 'live-assets',
    loadChildren: () =>
      import('./components/live-assets/live-assets.module').then(
        (m) => m.LiveAssetsModule
      ),
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
