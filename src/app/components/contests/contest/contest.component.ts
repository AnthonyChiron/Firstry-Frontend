import { ContestsService } from './../../../shared/data/ContestsService/contests.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss'],
})
export class ContestComponent implements OnInit {
  contest: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cs.getById(params.id).subscribe((contest) => {
        this.contest = contest;
      });
    });
  }
}
