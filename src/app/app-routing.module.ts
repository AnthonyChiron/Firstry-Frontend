import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RidersComponent } from './components/riders/riders.component';
import { ContestsComponent } from './components/contests/contests.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { LoginComponent } from './components/login/login.component';

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
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
