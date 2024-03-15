import { IsAuthGuard } from '../../shared/guards/IsAuth/is-auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLiveAssetComponent } from './main-live-asset/main-live-asset.component';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from 'src/app/shared/guards/IsAdmin/is-admin-guard.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountdownModule } from 'ngx-countdown';
import { WaitingAssetComponent } from './waiting-asset/waiting-asset.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

const liveAssetsRoutes: Routes = [
  {
    path: '',
    component: MainLiveAssetComponent,
    canActivate: [],
  },
];

@NgModule({
  declarations: [MainLiveAssetComponent, WaitingAssetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(liveAssetsRoutes),
    SharedModule,
    CountdownModule,
    CarouselModule,
  ],
})
export class LiveAssetsModule {}
