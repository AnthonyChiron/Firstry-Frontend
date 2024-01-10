import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';

@Component({
  selector: 'danger-zone',
  templateUrl: './danger-zone.component.html',
  styleUrls: ['./danger-zone.component.scss'],
})
export class DangerZoneComponent {
  @Input() contestId: string;
  isConfirmationModalOpen: boolean = false;

  constructor(private _cs: ContestsService, private router: Router) {}

  deleteContest() {
    this._cs.delete(this.contestId).subscribe((res) => {
      console.log(res);
    });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
