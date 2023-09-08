import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UsersService } from './services/UsersService/users.service';
import { SidebarPrimaryComponent } from './shared/sidebar-primary/sidebar-primary.component';
import { IconBtnComponent } from './shared/icon-btn/icon-btn.component';
import { SidebarSecondaryComponent } from './shared/sidebar-secondary/sidebar-secondary.component';
import { RidersComponent } from './components/riders/riders.component';
import { ContestsComponent } from './components/contests/contests.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RidersService } from './services/RidersService/riders.service';
import { RiderCardComponent } from './components/riders/rider-card/rider-card.component';
import { RegisterBtnComponent } from './shared/register-btn/register-btn.component';
import { LoginComponent } from './components/login/login.component';
import { ConnexionComponent } from './components/login/connexion/connexion.component';
import { JwtModule } from '@auth0/angular-jwt';
import { BtnPrimaryComponent } from './shared/btn-primary/btn-primary.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarPrimaryComponent,
    SidebarSecondaryComponent,
    IconBtnComponent,
    RidersComponent,
    ContestsComponent,
    AccueilComponent,
    NotFoundComponent,
    RiderCardComponent,
    RegisterBtnComponent,
    LoginComponent,
    ConnexionComponent,
    BtnPrimaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'], // remplacez par votre domaine
      },
    }),
  ],
  providers: [UsersService, RidersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
