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
  { path: 'riders', component: RidersComponent },
  { path: 'contests', component: ContestsComponent },
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
