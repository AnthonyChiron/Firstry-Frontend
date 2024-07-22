import { Component, OnInit } from '@angular/core';
import { is } from 'date-fns/locale';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';

@Component({
  selector: 'app-admin-contests-handler',
  templateUrl: './admin-contests-handler.component.html',
  styleUrls: ['./admin-contests-handler.component.scss'],
})
export class AdminContestsHandlerComponent implements OnInit {
  contests: any[] = [];
  isLoading: boolean = true;

  constructor(private _contestService: ContestsService) {}

  ngOnInit(): void {
    this._contestService.getAll().subscribe((contests) => {
      this.contests = contests;
      this.isLoading = false;
    });
  }

  toggleIsFederal(id) {
    this._contestService.toggleIsFederalById(id).subscribe((res) => {
      this.ngOnInit();
    });
  }
}
