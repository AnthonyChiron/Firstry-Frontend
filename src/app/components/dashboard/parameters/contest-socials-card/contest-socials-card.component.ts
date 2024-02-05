import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContestModel } from 'src/app/models/contest.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'contest-socials-card',
  templateUrl: './contest-socials-card.component.html',
  styleUrls: ['./contest-socials-card.component.scss'],
  providers: [FormUtilityService],
})
export class ContestSocialsCardComponent implements OnInit {
  @Input() contest: ContestModel;

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
    this.socialsForm = this.fb.group({
      instagram: [''],
      twitter: [''],
      youtube: [''],
      website: [''],
    });

    this.initSocialsForm(this.contest);
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

  saveSocials() {
    this.socialsEdit = false;
    this.socialsTouched = true;
    let contestForm = <ContestModel>{
      name: this.contest.name,
      description: this.contest.description,
      enablePayment: this.contest.enablePayment,
      sports: this.contest.sports,
      startDate: this.contest.startDate,
      endDate: this.contest.endDate,
      location: this.contest.location,
      branding: this.contest.branding,
      socials: this.socialsForm.value,
    };

    this.cs.update(this.contest._id, contestForm).subscribe((contest) => {
      this.contest = contest;

      this.contest.startDate = new Date(contest.startDate);
      this.contest.endDate = new Date(contest.endDate);

      this.initSocialsForm(this.contest);
    });
  }

  goToWebsite(url) {
    window.open(url, '_blank');
  }

  cancelSocials() {
    this.socialsEdit = false;
    this.initSocialsForm(this.contest);
  }
}
