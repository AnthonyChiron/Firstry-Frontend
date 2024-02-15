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

  onFileSelected(file: File) {
    this._contestService
      .uploadParentalAuthorization(this.contest._id, file)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
