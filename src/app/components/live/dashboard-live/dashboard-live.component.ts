import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContestModel } from 'src/app/models/contest.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'app-dashboard-live',
  templateUrl: './dashboard-live.component.html',
  styleUrls: ['./dashboard-live.component.scss'],
})
export class DashboardLiveComponent implements OnInit {
  constructor(
    private _contestsService: ContestsService,
    private _screenSize: ScreenSizeService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  contestsDdOptions: any[] = [];
  isMobile: boolean;
  isLoading: boolean = true;
  contests: ContestModel[] = [];
  selectedContest: ContestModel;
  selectedContestId: string;
  today: Date = new Date();

  ngOnInit(): void {
    this.isLoading = true;
    this._contestsService.getAll().subscribe((data) => {
      if (data && data.length > 0) {
        // Mise en place du dropdown
        this.contests = data;
        this.contestsDdOptions = data.map((contest) => {
          return { label: contest.name, value: contest._id };
        });
        console.log(this.contestsDdOptions);

        this._activatedRoute.params.subscribe((params) => {
          const contestId = params.contestId;
          if (contestId) {
            this.selectContest(contestId, false);
          } else {
            this.selectContest(this.contestsDdOptions[0].value, true);
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

  selectContest(eventId, redirect) {
    this.selectedContestId = eventId;
    this.selectedContest = this.contests.find(
      (contest) => contest._id == eventId
    );
    if (redirect) {
      this.router.navigate(['/live', this.selectedContestId, 'overview']);
    }
    this.isLoading = false;
  }
}
