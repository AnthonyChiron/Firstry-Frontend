import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { AdminService } from 'src/app/shared/services/AdminServices/admin.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  ridersStats: any = null;
  organizersStats: any = null;

  constructor(private _adminService: AdminService) {}

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {},
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  };

  public barChartData: ChartData<'bar'> = null;

  async ngOnInit() {
    this.ridersStats = await this._adminService.getRidersStats().toPromise();
    this.organizersStats = await this._adminService
      .getOrganizersStats()
      .toPromise();
    console.log(this.organizersStats);
    const labels = Object.keys(this.ridersStats.resultsByDay);
    const dataRiders = Object.values(this.ridersStats.resultsByDay);
    const dataOrganizers = Object.values(this.organizersStats.resultsByDay);
    this.barChartData = {
      labels: labels,
      datasets: [
        {
          data: <any>dataRiders,
          label: 'Rider',
          backgroundColor: '#202020',
          borderColor: '#202020',
          borderRadius: 10,
        },
        {
          data: <any>dataOrganizers,
          label: 'Organisateur',
          backgroundColor: '#585858',
          borderColor: '#585858',
          borderRadius: 10,
        },
      ],
    };
  }
}
