import { ScreenSizeService } from './../../shared/services/screenSize/screen-size.service';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import {
  Router,
  RouterOutlet,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { slider } from 'src/app/shared/transitions/slider';
import { fadeAnimation } from 'src/app/shared/transitions/fade';
import { filter } from 'rxjs';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private contestsService: ContestsService,
    private ssc: ScreenSizeService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  contests = [];
  contestsDdOptions: any[] = [];
  closePopup: boolean = true;
  isMobile: boolean;
  selectedContestId: string;

  ngOnInit(): void {
    this.contestsService.getOrganizerContests().subscribe((data) => {
      if (data) {
        this.contests = data;
        this.selectedContestId = this.contests[0]._id;

        // Mise en place du dropdown
        this.contestsDdOptions = this.contests.map((contest) => {
          return { label: contest.name, value: contest._id };
        });
      }
    });

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

    this.isMobile = this.ssc.isMobile;
    this.ssc.sizeChanged.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  selectedContest(event) {
    console.log(event);
    this.selectedContestId = event.value;
    this.router.navigate(['/dashboard', event.value, 'overview']);
  }
}
