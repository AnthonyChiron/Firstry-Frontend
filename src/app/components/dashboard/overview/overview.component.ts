import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ContestModel } from 'src/app/models/contest.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { de } from 'date-fns/locale';
import { delay } from 'rxjs';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cs.getById(params.contestId).subscribe((contest) => {
        console.log(contest);
        this.contest = contest;
        this.contest.startDate = new Date(this.contest.startDate);
        this.contest.endDate = new Date(this.contest.endDate);
      });
    });
  }
}
