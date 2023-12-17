import { ScreenSizeService } from './../../shared/services/screenSize/screen-size.service';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { slider } from 'src/app/shared/transitions/slider';
import { fadeAnimation } from 'src/app/shared/transitions/fade';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _contestsService: ContestsService,
    private _screenSize: ScreenSizeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  contestsDdOptions: any[] = [];
  closePopup: boolean = true;
  isMobile: boolean;
  selectedContestId: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
    });

    this._contestsService.getOrganizerContests().subscribe((data) => {
      if (data) {
        // Mise en place du dropdown
        this.contestsDdOptions = data.map((contest) => {
          return { label: contest.name, value: contest._id };
        });

        this.selectedContest(this.contestsDdOptions[0]);

        this.router.events
          .pipe(filter((event) => event instanceof NavigationEnd))
          .subscribe((event: NavigationEnd) => {
            const urlSegments = event.urlAfterRedirects.split('/');
            const dashboardIndex = urlSegments.findIndex(
              (segment) => segment === 'dashboard'
            );

            if (
              dashboardIndex !== -1 &&
              dashboardIndex === urlSegments.length - 1
            ) {
              // Aucun ID après 'dashboard/', ajoutez l'ID du premier contest
              this.selectedContest(this.contestsDdOptions[0]);
            }
          });
      }
    });

    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  selectedContest(event) {
    this.selectedContestId = event.value;
    this.router.navigate(['/dashboard', event.value, 'overview']);
  }
}
