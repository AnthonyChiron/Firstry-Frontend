import { ContestsService } from '../../../../shared/data/ContestsService/contests.service';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';
import { ContestModel } from 'src/app/models/contest.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private fb: FormBuilder,
    protected fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cs.getById(params.contestId).subscribe((contest) => {
        this.contest = contest;
        this.contest.startDate = new Date(this.contest.startDate);
        this.contest.endDate = new Date(this.contest.endDate);
        this.isLoading = false;
      });
    });
  }
}
