import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContestModel } from 'src/app/models/contest.model';
import {
  ContestPublishableStatus,
  ContestsService,
} from 'src/app/shared/data/ContestsService/contests.service';

@Component({
  selector: 'danger-zone',
  templateUrl: './danger-zone.component.html',
  styleUrls: ['./danger-zone.component.scss'],
})
export class DangerZoneComponent implements OnInit {
  @Input() contest: ContestModel;
  isPublishConfirmationModalOpen: boolean = false;
  isDeleteConfirmationModalOpen: boolean = false;
  contestPublishableStatus: ContestPublishableStatus = null;
  isContestPublished: boolean = false;

  constructor(private _cs: ContestsService, private router: Router) {}

  ngOnInit(): void {
    if (!this.contest.isPublished)
      this._cs
        .isContestPublishable(this.contest._id)
        .subscribe((res: ContestPublishableStatus) => {
          this.contestPublishableStatus = res;
        });
  }

  publishContest() {
    this._cs.publish(this.contest._id).subscribe((res) => {});
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  deleteContest() {
    this._cs.delete(this.contest._id).subscribe((res) => {});
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
