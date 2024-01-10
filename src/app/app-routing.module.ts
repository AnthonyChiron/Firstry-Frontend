import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { IsValidGuard } from './shared/guards/isValid/is-valid.service';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { LoginComponent } from './shared/components/login/login.component';
import { IsNotAuthGuard } from './shared/guards/IsNotAuth/is-not-auth.service';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  {
    path: 'riders',
    loadChildren: () =>
      import('./components/riders/riders.module').then((m) => m.RidersModule),
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
    path: 'register',
    loadChildren: () =>
      import('./shared/components/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./components/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotAuthGuard],
  },

  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
