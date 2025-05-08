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
  currentMonthContests: ContestModel[] = null;
  previousContests: ContestModel[] = null;
  today: Date;
  currentMonth: string;

  ngOnInit(): void {
    this.today = new Date();
    this.currentMonth = this.today.toLocaleString('default', { month: 'long' }); // Nom du mois actuel

    this.contestsService.getAll().subscribe((data) => {
      this.contests = [];
      if (data) {
        data.forEach((contest) => {
          contest = parseContestModel(contest);
          if (contest.isPublished) this.contests.push(contest);
        });
        console.log(this.contests);

        this.initCurrentMonthContests();
        this.initNextMonthContests();
        this.initComingSoonContests();
        this.initPreviousContests();
        console.log(this.previousContests);
      }
    });
  }

  initCurrentMonthContests() {
    const firstDayCurrentMonth = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      1
    );
    const lastDayCurrentMonth = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + 1,
      0
    );

    this.currentMonthContests = this.contests.filter(
      (contest) =>
        contest.startDate >= firstDayCurrentMonth &&
        contest.startDate <= lastDayCurrentMonth
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

  initPreviousContests() {
    this.previousContests = this.contests.filter(
      (contest) => contest.endDate < this.today
    );
  }
}
