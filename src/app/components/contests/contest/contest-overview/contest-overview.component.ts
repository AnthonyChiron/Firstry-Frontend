import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'contest-overview',
  templateUrl: './contest-overview.component.html',
  styleUrls: ['./contest-overview.component.scss'],
})
export class ContestOverviewComponent implements OnInit {
  contest: ContestModel = null;
  isMobile: boolean = false;

  constructor(
    private _screenSizeService: ScreenSizeService,
    private _activatedRoute: ActivatedRoute,
    private _contestService: ContestsService
  ) {}

  ngOnInit(): void {
    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this._activatedRoute.parent.params.subscribe((params) => {
      if (params.id) {
        this._contestService.getById(params.id).subscribe((contest) => {
          console.log(contest);
          this.contest = parseContestModel(contest);
        });
      }
    });
  }
}
