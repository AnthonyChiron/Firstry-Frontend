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
import { ContestModel } from 'src/app/models/contest.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
      transition('* <=> void', animate('500ms ease-in-out')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _contestsService: ContestsService,
    private _screenSize: ScreenSizeService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  contestsDdOptions: any[] = [];
  closePopup: boolean = true;
  isMobile: boolean;
  isLoading: boolean = true;
  contests: ContestModel[] = [];
  selectedContest: ContestModel;
  selectedContestId: string;

  ngOnInit(): void {
    this.isLoading = true;
    this._contestsService.getOrganizerContests().subscribe((data) => {
      if (data && data.length > 0) {
        // Mise en place du dropdown
        this.contests = data;
        this.contestsDdOptions = data.map((contest) => {
          return { label: contest.name, value: contest._id };
        });

        this._activatedRoute.params.subscribe((params) => {
          const contestId = params.contestId;
          console.log(contestId);
          if (contestId) {
            this.selectContest(contestId);
          } else {
            this.selectContest(this.contestsDdOptions[0].value);
            this.router.navigate([
              '/dashboard',
              this.contestsDdOptions[0].value,
              'overview',
            ]);
          }
        });
      } else {
        this.isLoading = false;
      }
    });

    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  selectContest(eventId) {
    this.selectedContestId = eventId;
    this.selectedContest = this.contests.find(
      (contest) => contest._id == eventId
    );
    this.isLoading = false;
  }
}
