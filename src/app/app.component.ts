import { ScreenSizeService } from './shared/services/screenSize/screen-size.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(private _screenSize: ScreenSizeService) {}

  ngOnInit(): void {
    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    console.log('Production : ' + environment.production);
  }

  changeToggle() {
    this.toggleSidebar = !this.toggleSidebar;
  }
}
