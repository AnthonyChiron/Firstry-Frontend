import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobileSidebarComponent } from './components/sidebar/mobile-sidebar/mobile-sidebar.component';
import { LoginModule } from './shared/components/login/login.module';
import { UsersService } from './shared/data/UsersService/users.service';
import { ScreenSizeService } from './shared/services/screenSize/screen-size.service';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SharedModule } from './shared/shared.module';
import { DesktopSidebarComponent } from './components/sidebar/desktop-sidebar/desktop-sidebar.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AuthInterceptor } from './shared/data/InterceptorHttp/interceptorHttp.service';

@NgModule({
  declarations: [
    AppComponent,
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
  ],
  providers: [
    UsersService,
    ScreenSizeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
