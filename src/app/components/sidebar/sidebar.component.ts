import { Subscription } from 'rxjs';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { rolesEnum } from 'src/app/constants/rolesEnum';
import { AuthService } from 'src/app/shared/auth/AuthService/auth.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  rolesEnum = rolesEnum;
  showLoginModal = false;
  toggleMenu = true;

  constructor(
    protected authService: AuthService,
    protected screenSizeService: ScreenSizeService
  ) {
    if (screenSizeService.isDesktop) this.toggleMenu = true;
  }

  closeModal() {
    this.showLoginModal = false;
  }
}
