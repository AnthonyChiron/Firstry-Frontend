import { AppComponent } from './../../../app.component';
import { is } from 'date-fns/locale';
import { Component, OnInit } from '@angular/core';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';

@Component({
  selector: 'app-admin-riders-handler',
  templateUrl: './admin-riders-handler.component.html',
  styleUrls: ['./admin-riders-handler.component.scss'],
})
export class AdminRidersHandlerComponent implements OnInit {
  riders: any[] = [];
  page: number = 1;
  pageSize: number = 50;
  isLoading: boolean = true;

  constructor(private _ridersService: RidersService) {}

  ngOnInit(): void {
    this._ridersService
      .getByPage(this.page, this.pageSize)
      .subscribe((riders: any) => {
        this.riders = riders.data;
        this.isLoading = false;
      });
  }

  toggleVerification(id: string) {
    this._ridersService.toggleVerification(id).subscribe((res) => {
      this.ngOnInit();
    });
  }
}
