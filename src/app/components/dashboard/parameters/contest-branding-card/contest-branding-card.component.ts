import { Component, Input } from '@angular/core';
import { ContestModel } from 'src/app/models/contest.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';

@Component({
  selector: 'contest-branding-card',
  templateUrl: './contest-branding-card.component.html',
  styleUrls: ['./contest-branding-card.component.scss'],
})
export class ContestBrandingCardComponent {
  @Input() contest: ContestModel;

  constructor(private cs: ContestsService) {}

  async onUploadImage(photo, type) {
    this.cs
      .uploadContestBrandImage(this.contest._id, photo, type)
      .subscribe((contest) => {
        this.contest.branding = contest.branding;
      });
  }
}
