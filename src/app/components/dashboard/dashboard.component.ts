import { ScreenSizeService } from './../../shared/services/screenSize/screen-size.service';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private contestsService: ContestsService,
    private ssc: ScreenSizeService,
    private router: Router
  ) {}

  contests = [];
  contestsDdOptions: any[] = [];
  closePopup: boolean = true;
  isMobile: boolean;

  ngOnInit(): void {
    this.contestsService.getOrganizerContests().subscribe((data) => {
      if (data) {
        this.contests = data;
        this.contestsDdOptions = this.contests.map((contest) => {
          return { label: contest.name, value: contest._id };
        });
        this.router.navigate(['/dashboard', this.contests[0]._id, 'overview']);
        console.log(this.contestsDdOptions);
      }
    });

    this.isMobile = this.ssc.isMobile;
    this.ssc.sizeChanged.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  test(event) {
    console.log(event);
  }
}
