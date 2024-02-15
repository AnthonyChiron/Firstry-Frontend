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
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss'],
})
export class MobileSidebarComponent {
  showLoginModal = false;
  @Input() toggleSidebar: boolean = true;
  @Output() clickToggle = new EventEmitter();
  isLoggedIn: boolean = false;

  constructor(
    protected _authService: AuthService,
    protected _screenSize: ScreenSizeService
  ) {
    this._screenSize.isMobile$.subscribe((isMobile) => {
      if (!isMobile) this.toggleSidebar = false;
    });
  }

  ngOnInit(): void {
    this._authService.isLoggedIn().subscribe((loggedIn) => {
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
