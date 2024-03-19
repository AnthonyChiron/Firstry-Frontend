import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { PoolsService } from 'src/app/shared/data/PoolsService/pools.service';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'app-contest-results',
  templateUrl: './contest-results.component.html',
  styleUrls: ['./contest-results.component.scss'],
})
export class ContestResultsComponent implements OnInit {
  isMobile: boolean = false;
  contest: ContestModel = null;
  selectedCategory: any = null;
  selectedStep: any = null;
  results: any[] = [];

  constructor(
    private _screenSizeService: ScreenSizeService,
    private _contestService: ContestsService,
    private _activatedRoute: ActivatedRoute,
    private _registrationService: RegistrationsService,
    private _poolsService: PoolsService
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

  onSelectedCategory(category: any) {
    this.selectedCategory = category;
  }
}
