import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
      transition('* <=> void', animate('500ms ease-in-out')),
    ]),
  ],
})
export class CategoriesDetailsComponent implements OnInit {
  contest: any;

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
      });
    });
  }
}
