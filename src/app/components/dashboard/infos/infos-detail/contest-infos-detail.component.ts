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
  infosTouched: boolean = false;
  infosEdit: boolean = false;

  socialsForm: any;
  socialsTouched: boolean = false;
  socialsEdit: boolean = false;

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

    this.socialsForm = this.fb.group({
      instagram: [''],
      twitter: [''],
      youtube: [''],
      website: [''],
    });

    this.activatedRoute.params.subscribe((params) => {
      this.cs.getById(params.contestId).subscribe((contest) => {
        this.contest = contest;
        this.contest.startDate = new Date(this.contest.startDate);
        this.contest.endDate = new Date(this.contest.endDate);
        this.initForms(this.contest);
        this.isLoading = false;
      });
    });
  }

  initForms(contest: any) {
    this.initInfosForm(contest);
    this.initSocialsForm(contest);
  }

  initInfosForm(contest: any) {
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

  initSocialsForm(contest: any) {
    this.socialsForm.patchValue({
      name: contest.name,
      instagram:
        contest.socials && contest.socials.instagram
          ? contest.socials.instagram
          : '',
      twitter:
        contest.socials && contest.socials.twitter
          ? contest.socials.twitter
          : '',
      youtube:
        contest.socials && contest.socials.youtube
          ? contest.socials.youtube
          : '',
      website:
        contest.socials && contest.socials.website
          ? contest.socials.website
          : '',
    });
    this.fus.setForm(this.socialsForm);
  }

  cancelInfos() {
    this.infosEdit = false;
    this.initInfosForm(this.contest);
  }

  cancelSocials() {
    this.socialsEdit = false;
    this.initSocialsForm(this.contest);
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

  saveInfos() {
    this.infosEdit = false;
    this.infosTouched = true;
    this.cs
      .update(this.contest._id, this.infosForm.value)
      .subscribe((contest) => {
        this.contest = contest;
        this.contest.startDate = new Date(contest.startDate);
        this.contest.endDate = new Date(contest.endDate);

        this.initInfosForm(this.contest);
      });
  }

  saveSocials() {
    this.socialsEdit = false;
    this.socialsTouched = true;
    let contestForm = <ContestModel>{
      name: this.contest.name,
      description: this.contest.description,
      sports: this.contest.sports,
      startDate: this.contest.startDate,
      endDate: this.contest.endDate,
      location: this.contest.location,
      branding: this.contest.branding,
      socials: this.socialsForm.value,
    };
    console.log(contestForm);

    this.cs.update(this.contest._id, contestForm).subscribe((contest) => {
      console.log(contest);
      this.contest = contest;

      this.contest.startDate = new Date(contest.startDate);
      this.contest.endDate = new Date(contest.endDate);

      this.initSocialsForm(this.contest);
    });
  }

  goToWebsite(url) {
    window.open(url, '_blank');
  }
}
