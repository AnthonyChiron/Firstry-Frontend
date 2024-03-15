import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  title = 'firstry';
  toggleSidebar: boolean = false;
  isMobile: boolean = false;
  shadow: boolean = false;
  container: boolean = true;

  constructor(
    private _screenSize: ScreenSizeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    // get the current route
    this._router.events.subscribe((val: any) => {
      if (val.url)
        if (val.url === '/') this.container = false;
        else this.container = true;
    });
  }

  changeToggle() {
    this.toggleSidebar = !this.toggleSidebar;
  }
}
