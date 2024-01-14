import { ContestsService } from '../../../../shared/data/ContestsService/contests.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
  selector: 'contest-parameters-detail',
  templateUrl: './contest-parameters-detail.component.html',
  styleUrls: ['./contest-parameters-detail.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
      transition('* <=> void', animate('500ms ease-in-out')),
    ]),
  ],
})
export class ContestParametersDetailComponent implements OnInit {
  contest: ContestModel;
  isLoading: boolean = true;
  isMobile: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _contestService: ContestsService,
    private _screenSize: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this._screenSize.isMobile$.subscribe((result) => {
      this.isMobile = result;
    });

    this._activatedRoute.parent.params.subscribe((params) => {
      this._contestService.getById(params.contestId).subscribe((contest) => {
        this.contest = parseContestModel(contest);
        this.isLoading = false;
      });
    });
  }
}
