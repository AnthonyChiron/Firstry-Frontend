import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SidebarPrimaryComponent } from './shared/sidebar-primary/sidebar-primary.component';
import { IconBtnComponent } from './shared/icon-btn/icon-btn.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterBtnComponent } from './shared/register-btn/register-btn.component';
import { BtnPrimaryComponent } from './shared/btn-primary/btn-primary.component';
import { UsersService } from './services/data/UsersService/users.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarPrimaryComponent,
    IconBtnComponent,
    AccueilComponent,
    NotFoundComponent,
    RegisterBtnComponent,
    BtnPrimaryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
