import { Subscription } from 'rxjs';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { rolesEnum } from 'src/app/constants/rolesEnum';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  rolesEnum = rolesEnum;
  showLoginModal = false;
  @Input() toggleSidebar: boolean = false;
  @Output() clickToggle = new EventEmitter();

  constructor(
    protected authService: AuthService,
    protected screenSizeService: ScreenSizeService
  ) {
    if (screenSizeService.isDesktop) this.toggleSidebar = true;
  }

  emitClickToggle() {
    this.clickToggle.emit();
  }

  closeModal() {
    this.showLoginModal = false;
  }
}
