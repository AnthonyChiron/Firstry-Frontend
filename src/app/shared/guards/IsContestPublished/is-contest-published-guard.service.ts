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
import { ContestsService } from '../../data/ContestsService/contests.service';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class IsContestPublishedGuard implements CanActivate {
  constructor(public router: Router, private contestService: ContestsService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      await this.contestService.getById(next.params.id).subscribe((contest) => {
        if (contest.isPublished === false) {
          this.router.navigate(['/not-found']);
          return false;
        }
        return true;
      });
      return true;
    } catch (error) {
      this.router.navigate(['/not-found']);
      return false;
    }
  }
}
