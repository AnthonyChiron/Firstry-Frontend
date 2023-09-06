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
import { SidebarIconComponent } from './shared/sidebar-icon/sidebar-icon.component';
import { IconBtnComponent } from './shared/icon-btn/icon-btn.component';
import { SidebarIconTextComponent } from './shared/sidebar-icon-text/sidebar-icon-text.component';
import { RidersComponent } from './components/riders/riders.component';
import { ContestsComponent } from './components/contests/contests.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RidersService } from './services/RidersService/riders.service';
import { RiderCardComponent } from './components/riders/rider-card/rider-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarIconComponent,
    SidebarIconTextComponent,
    IconBtnComponent,
    RidersComponent,
    ContestsComponent,
    AccueilComponent,
    NotFoundComponent,
    RiderCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [UsersService, RidersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
