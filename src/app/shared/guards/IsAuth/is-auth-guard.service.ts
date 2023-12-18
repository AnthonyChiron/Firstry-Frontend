import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthGuard {
  isMobile: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private _screenSizeService: ScreenSizeService
  ) {
    this._screenSizeService.isMobile$.subscribe((result) => {
      this.isMobile = result;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.hasToken()) {
      if (this.isMobile) this.router.navigate(['/login']);
      else this.router.navigate(['/access-denied']);
    }
    return true;
  }
}
