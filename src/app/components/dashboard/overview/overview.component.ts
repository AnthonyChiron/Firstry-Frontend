import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
      transition('* <=> void', animate('500ms ease-in-out')),
    ]),
  ],
})
export class OverviewComponent implements OnInit {
  contest: ContestModel;
  isMobile: boolean;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private _screenSize: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this._activatedRoute.parent.params.subscribe((params) => {
      this.cs.getById(params.contestId).subscribe((contest) => {
        this.contest = parseContestModel(contest);
        console.log(this.contest);
      });
    });
  }
}
