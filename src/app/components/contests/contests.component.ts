import { ContestModel } from 'src/app/models/contest.model';
import { Component, OnInit } from '@angular/core';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss'],
})
export class ContestsComponent implements OnInit {
  constructor(private contestsService: ContestsService) {}
  contests: ContestModel[] = [];

  ngOnInit(): void {
    this.contestsService.getAll().subscribe((data) => {
      if (data) {
        console.log(data);
        this.contests = data;
      }
    });
  }
}
