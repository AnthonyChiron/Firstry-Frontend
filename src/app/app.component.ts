import { ScreenSizeService } from './shared/services/screenSize/screen-size.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'firstry';
  toggleSidebar: boolean = false;
  isMobile: boolean = false;
  shadow: boolean = false;

  constructor(private screenSizeService: ScreenSizeService) {}

  ngOnInit(): void {
    this.isMobile = this.screenSizeService.isMobile;
    this.screenSizeService.sizeChanged.subscribe((isMobile) => {
      this.isMobile = isMobile;
      console.log('isMobile', isMobile);
      if (isMobile) this.toggleSidebar = false;
    });
  }

  ngOnDestroy(): void {
    this.screenSizeService.sizeChanged.unsubscribe();
  }

  changeToggle() {
    this.toggleSidebar = !this.toggleSidebar;
  }
}
