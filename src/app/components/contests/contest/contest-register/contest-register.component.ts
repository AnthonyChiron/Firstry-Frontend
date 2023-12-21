import { is } from 'date-fns/locale';
import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ActivatedRoute } from '@angular/router';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';

@Component({
  selector: 'app-contest-register',
  templateUrl: './contest-register.component.html',
  styleUrls: ['./contest-register.component.scss'],
})
export class ContestRegisterComponent implements OnInit {
  isMobile: boolean = false;
  contest: ContestModel = null;
  selectedCategory: any = null;

  constructor(
    private _screenSizeService: ScreenSizeService,
    private _contestService: ContestsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

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

  register() {
    console.log(this.selectedCategory);
  }

  getDateFromSteps(steps: number) {
    let date = new Date();
    date.setDate(date.getDate() + steps);
    return date;
  }
}
