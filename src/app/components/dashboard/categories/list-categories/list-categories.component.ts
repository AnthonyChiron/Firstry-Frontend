import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';

@Component({
  selector: 'list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
})
export class ListCategoriesComponent implements OnInit, OnChanges {
  @Input() contest: any;

  constructor(private contestsService: ContestsService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log(this.contest);
  }
}
