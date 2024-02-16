import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(
    private _screenSize: ScreenSizeService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  isMobile: boolean;
  isLoading: boolean = true;

  ngOnInit(): void {
    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    // go to admin/overview if no route is specified
    if (this.router.url == '/admin') {
      this.router.navigate(['overview'], { relativeTo: this._activatedRoute });
    }
  }
}
