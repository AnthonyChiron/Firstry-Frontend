import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'app-contest-planning',
  templateUrl: './contest-planning.component.html',
  styleUrls: ['./contest-planning.component.scss'],
})
export class ContestPlanningComponent implements OnInit {
  isMobile: boolean = false;
  contest: ContestModel = null;
  selectedCategory: any = null;

  constructor(
    private _screenSizeService: ScreenSizeService,
    private _contestService: ContestsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.parent.params.subscribe((params) => {
      if (params.id) {
        this._contestService.getById(params.id).subscribe((contest) => {
          this.contest = parseContestModel(contest);
          if (this.contest.categories.length > 0)
            this.selectedCategory = this.contest.categories[0];
        });
      }
    });
  }
}
