import { Component, Input } from '@angular/core';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';

@Component({
  selector: 'legal-files',
  templateUrl: './legal-files.component.html',
  styleUrls: ['./legal-files.component.scss'],
})
export class LegalFilesComponent {
  @Input() contest: any;

  constructor(private _contestService: ContestsService) {}

  onFileSelected(type: string, file: File) {
    if (type === 'parentalAuthorization') {
      this._contestService
        .uploadParentalAuthorizationFile(this.contest._id, file)
        .subscribe((res) => {
          this.contest = res;
        });
    }
    if (type === 'rules')
      this._contestService
        .uploadRulesFile(this.contest._id, file)
        .subscribe((res) => {
          this.contest = res;
        });
  }
}
