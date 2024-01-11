import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { OrganizersService } from '../../data/OrganizersService/organizers.service';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class IsOrganizerContestGuard implements CanActivate {
  constructor(
    public router: Router,
    private organizerService: OrganizersService,
    private authService: AuthService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let user = this.authService.getCurrentUser();
    if (!user.organizer) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    try {
      console.log(next.params.id);
      await this.organizerService
        .isOrganizerContest(user.organizer._id, next.params.id)
        .subscribe((isOrganizerContest) => {
          if (!isOrganizerContest) {
            this.router.navigate(['/access-denied']);
            return false;
          }
          return true;
        });
      return true;
    } catch (error) {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
