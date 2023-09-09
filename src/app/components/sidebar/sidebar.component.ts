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
  showModal = true;
  toggleMenu = true;

  constructor(
    protected authService: AuthService,
    protected screenSizeService: ScreenSizeService
  ) {}

  closeModal() {
    this.showModal = false;
  }

  display(log: String) {
    console.log(log);
  }
}
