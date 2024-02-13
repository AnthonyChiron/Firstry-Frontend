import { ScreenSizeService } from './shared/services/screenSize/screen-size.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
      console.log(val);
      if (val.url)
        if (val.url === '/') this.container = false;
        else this.container = true;
      console.log(this.container);
    });

    console.log('Production : ' + environment.production);
  }

  changeToggle() {
    this.toggleSidebar = !this.toggleSidebar;
  }
}
