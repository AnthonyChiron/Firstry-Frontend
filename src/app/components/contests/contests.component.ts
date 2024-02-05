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
import { last } from 'rxjs';

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
  nextWeekContests: ContestModel[] = null;
  nextMonthContests: ContestModel[] = null;
  comingSoonContests: ContestModel[] = null;
  today: Date;

  ngOnInit(): void {
    this.today = new Date();

    this.contestsService.getAll().subscribe((data) => {
      this.contests = [];
      if (data) {
        data.forEach((contest) => {
          contest = parseContestModel(contest);

          if (contest.isPublished) this.contests.push(contest);
        });

        this.initNextWeekContests();
        this.initNextMonthContests();
        this.initComingSoonContests();
      }
    });
  }

  initNextWeekContests() {
    const dayOfWeek = this.today.getDay(); // Dimanche = 0, Lundi = 1, etc.
    const daysUntilNextMonday = (7 - dayOfWeek + 1) % 7;
    const nextMonday = new Date(
      new Date(this.today).setDate(this.today.getDate() + daysUntilNextMonday)
    );

    // Le dernier jour de la semaine prochaine (dimanche)
    const nextSunday = new Date(
      new Date(nextMonday).setDate(nextMonday.getDate() + 6)
    );

    this.nextWeekContests = this.contests.filter(
      (contest) =>
        contest.startDate >= nextMonday && contest.startDate <= nextSunday
    );
  }

  initNextMonthContests() {
    const firstDayNextMonth = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + 1,
      1
    );
    const lastDayNextMonth = new Date(
      firstDayNextMonth.getFullYear(),
      firstDayNextMonth.getMonth() + 1,
      0
    );

    this.nextMonthContests = this.contests.filter(
      (contest) =>
        contest.startDate >= firstDayNextMonth &&
        contest.startDate <= lastDayNextMonth
    );
  }

  initComingSoonContests() {
    const firstDayNextMonth = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + 1,
      1
    );
    const lastDayNextMonth = new Date(
      firstDayNextMonth.getFullYear(),
      firstDayNextMonth.getMonth() + 1,
      0
    );

    this.comingSoonContests = this.contests.filter(
      (contest) => contest.startDate > lastDayNextMonth
    );
  }
}
