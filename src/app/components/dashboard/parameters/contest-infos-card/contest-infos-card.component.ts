import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContestModel } from 'src/app/models/contest.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'contest-infos-card',
  templateUrl: './contest-infos-card.component.html',
  styleUrls: ['./contest-infos-card.component.scss'],
})
export class ContestInfosCardComponent implements OnInit {
  @Input() contest: ContestModel;
  form: any;
  touched: boolean = false;
  edit: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private fb: FormBuilder,
    protected fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      sports: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      branding: [{ logo: [''], banner: [''] }],
    });

    this.initForm(this.contest);
  }

  initForm(contest: any) {
    this.form.patchValue({
      name: contest.name,
      description: contest.description,
      startDate: contest.startDate,
      endDate: contest.endDate,
      sports: contest.sports,
      location: contest.location,
      branding: contest.branding,
    });
    this.fus.setForm(this.form);
  }

  cancelInfos() {
    this.edit = false;
    this.initForm(this.contest);
  }

  saveInfos() {
    this.edit = false;
    this.touched = true;
    this.cs.update(this.contest._id, this.form.value).subscribe((contest) => {
      this.contest = contest;
      this.contest.startDate = new Date(contest.startDate);
      this.contest.endDate = new Date(contest.endDate);

      this.form(this.contest);
    });
  }
}
