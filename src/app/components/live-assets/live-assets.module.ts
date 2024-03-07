import { IsAuthGuard } from '../../shared/guards/IsAuth/is-auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLiveAssetComponent } from './main-live-asset/main-live-asset.component';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from 'src/app/shared/guards/IsAdmin/is-admin-guard.service';
import { SharedModule } from 'primeng/api';

const liveAssetsRoutes: Routes = [
  {
    path: '',
    component: MainLiveAssetComponent,
    canActivate: [],
  },
];

@NgModule({
  declarations: [MainLiveAssetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(liveAssetsRoutes),
    SharedModule,
  ],
})
export class LiveAssetsModule {}
