import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private contestsService: ContestsService) {}
  contests = [];

  ngOnInit(): void {
    this.contestsService.getOrganizerContests().subscribe((data) => {
      if (data) {
        this.contests = data;
        console.log(this.contests);
      }
    });
  }
}
