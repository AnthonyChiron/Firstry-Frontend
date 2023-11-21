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
      sports: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      branding: [{ logo: [''], banner: [''] }],
    });

    this.activatedRoute.params.subscribe((params) => {
      this.cs.getById(params.contestId).subscribe((contest) => {
        console.log(contest);
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
      sports: contest.sports,
      location: contest.location,
      branding: contest.branding,
    });
    this.fus.setForm(this.infosForm);
  }

  cancel() {
    this.edit = false;
    this.initForm(this.contest);
  }

  async onUploadImage(event, type) {
    const blob = await fetch(event.objectUrl).then((r) => r.blob());
    const img = new File([blob], type + '.png', { type: 'image/png' });
    this.cs
      .uploadContestBrandImage(this.contest._id, img)
      .subscribe((contest) => {
        console.log(contest);
        this.contest.branding = contest.branding;
      });
  }

  save() {
    console.log(this.infosForm.value);
    this.edit = false;
    this.touched = true;
    console.log(this.infosForm.value);
    this.cs
      .update(this.contest._id, this.infosForm.value)
      .subscribe((contest) => {
        this.contest = contest;
        this.contest.startDate = new Date(contest.startDate);
        this.contest.endDate = new Date(contest.endDate);

        this.initForm(this.contest);
      });
  }
}
