import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';

@Component({
  selector: 'list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent implements OnInit, OnChanges {
  @Input() contest: any;

  constructor(private contestsService: ContestsService) {}

  ngOnInit(): void {
    this.getContestCategories();
  }

  ngOnChanges(): void {
    console.log(this.contest);
    this.getContestCategories();
  }

  getContestCategories() {
    // if (this.contest)
    //   this.contestsService
    //     .getContestCategories(this.contest._id)
    //     .subscribe((data) => {});
  }
}
