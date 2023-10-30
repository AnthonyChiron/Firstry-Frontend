import { ContestsService } from './../../../../shared/data/ContestsService/contests.service';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';
import { ContestModel } from 'src/app/models/contest.model';

@Component({
  selector: 'app-contest-infos-detail',
  templateUrl: './contest-infos-detail.component.html',
  styleUrls: ['./contest-infos-detail.component.scss'],
})
export class ContestInfosDetailComponent implements OnInit {
  contest: ContestModel;
  isLoading: boolean = true;
  infosForm: any;
  touched: boolean = false;
  edit: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private fb: FormBuilder,
    protected fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.infosForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      branding: [{ logo: [''], banner: [''] }],
      contestId: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe((params) => {
      this.cs.getById(params.contestId).subscribe((contest) => {
        this.contest = contest;
        this.contest.startDate = new Date(this.contest.startDate);
        this.contest.endDate = new Date(this.contest.endDate);
        this.initForm(this.contest);
        this.isLoading = false;
        console.log(this.infosForm.value);
      });
    });
  }

  initForm(contest: any) {
    this.infosForm.patchValue({
      name: contest.name,
      description: contest.description,
      startDate: contest.startDate,
      endDate: contest.endDate,
      location: contest.location,
      branding: contest.branding,
      contestId: contest._id,
    });
    this.fus.setForm(this.infosForm);
  }

  cancel() {
    this.edit = false;
    this.initForm(this.contest);
  }

  save() {
    this.edit = false;
    this.touched = true;
    // this.cs.update(this.infosForm.value).subscribe((contest) => {
    //   this.contest = contest;
    //   this.initForm(this.contest);
    // });
  }
}
