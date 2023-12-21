import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

@Component({
  selector: 'desktop-sidebar',
  templateUrl: './desktop-sidebar.component.html',
  styleUrls: ['./desktop-sidebar.component.scss'],
})
export class DesktopSidebarComponent {
  displayText: boolean = false;

  constructor(protected _authService: AuthService) {}
}
