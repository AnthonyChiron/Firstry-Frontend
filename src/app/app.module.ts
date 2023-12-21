import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobileSidebarComponent } from './components/sidebar/mobile-sidebar/mobile-sidebar.component';
import { LoginModule } from './components/login/login.module';
import { UsersService } from './shared/data/UsersService/users.service';
import { ScreenSizeService } from './shared/services/screenSize/screen-size.service';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SharedModule } from './shared/shared.module';
import { DesktopSidebarComponent } from './components/sidebar/desktop-sidebar/desktop-sidebar.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    NotFoundComponent,
    MobileSidebarComponent,
    DesktopSidebarComponent,
    TopbarComponent,
    AccessDeniedComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginModule,
    SharedModule,
    NgxStripeModule.forRoot(
      'pk_test_51OPhx3ExeV2TEn3k0EWYu7LkqusSy8cewkqOMeV6ydwt6ICp84mIxzw2oPzyh8v3awLSP9ymlJqrx2ysjS00TKlU00yuzgNMzN'
    ),
  ],
  providers: [UsersService, ScreenSizeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
