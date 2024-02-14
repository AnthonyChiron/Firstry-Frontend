import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  firstCall: boolean = false;
  isMobile: boolean = false;
  @Input() openTab: number = 0;
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private route: Router,
    private elementRef: ElementRef,
    private _screenSizeService: ScreenSizeService
  ) {
    this._screenSizeService.isMobile$.subscribe((result) => {
      this.isMobile = result;
    });
    if (this.route.url.includes('register')) {
      this.openTab = 1;
    } else this.openTab = 0;
  }

  closeModal() {
    this.modalClosed.emit();
  }
}
