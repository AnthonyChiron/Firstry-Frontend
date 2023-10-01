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
  selector: 'mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss'],
})
export class MobileSidebarComponent {
  rolesEnum = rolesEnum;
  showLoginModal = false;
  @Input() toggleSidebar: boolean = true;
  @Output() clickToggle = new EventEmitter();
  isLoggedIn: boolean = false;

  constructor(
    protected authService: AuthService,
    protected screenSizeService: ScreenSizeService
  ) {
    if (screenSizeService.isDesktop) this.toggleSidebar = false;
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  emitClickToggle() {
    this.clickToggle.emit();
  }

  closeModal() {
    this.showLoginModal = false;
  }
}
