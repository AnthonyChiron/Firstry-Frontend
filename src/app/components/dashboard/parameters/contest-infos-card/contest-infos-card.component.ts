import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { FormContestInfosService } from 'src/app/shared/services/FormUtility/form-contest-infos.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'contest-infos-card',
  templateUrl: './contest-infos-card.component.html',
  styleUrls: ['./contest-infos-card.component.scss'],
  providers: [FormUtilityService],
})
export class ContestInfosCardComponent implements OnInit {
  @Input() contest: ContestModel;
  form: any;
  edit: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private fb: FormBuilder,
    private _formContestInfoService: FormContestInfosService,
    protected _fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.form = this._formContestInfoService.createForm(this.contest);
    this._fus.setForm(this.form);

    console.log(this.form.value);
  }

  cancelInfos() {
    this.edit = false;
    this._formContestInfoService.fillForm(this.form, this.contest);
  }

  saveInfos() {
    this.form.markAllAsTouched();

    console.log(this.form.value);
    if (this.form.invalid) return;

    this.edit = false;
    this.cs.update(this.contest._id, this.form.value).subscribe((contest) => {
      this.contest = parseContestModel(contest);
      this._formContestInfoService.fillForm(this.form, this.contest);
    });
  }
}
