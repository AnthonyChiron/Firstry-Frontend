import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { Component, OnInit } from '@angular/core';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
      transition('* <=> void', animate('500ms ease-in-out')),
    ]),
  ],
})
export class ContestsComponent implements OnInit {
  constructor(private contestsService: ContestsService) {}
  contests: ContestModel[] = null;

  ngOnInit(): void {
    this.contestsService.getAll().subscribe((data) => {
      this.contests = [];
      if (data) {
        data.forEach((contest) => {
          contest = parseContestModel(contest);

          if (contest.isPublished) this.contests.push(contest);
        });
      }
    });
  }
}
