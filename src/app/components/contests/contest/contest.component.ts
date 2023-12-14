import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { ContestsService } from './../../../shared/data/ContestsService/contests.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ContestModel,
  parseToContestModel,
} from 'src/app/models/contest.model';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss'],
})
export class ContestComponent implements OnInit {
  contest: ContestModel;
  isMobile: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private ss: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cs.getById(params.id).subscribe((contest) => {
        this.contest = parseToContestModel(contest);
      });
    });

    this.isMobile = this.ss.isMobile;
    this.ss.sizeChanged.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
