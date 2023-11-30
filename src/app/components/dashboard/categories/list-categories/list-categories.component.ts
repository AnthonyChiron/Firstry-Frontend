import { CategoriesService } from './../../../../shared/data/CategoriesService/categories.service';
import { CategoryModel } from 'src/app/models/category.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';

@Component({
  selector: 'list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
})
export class ListCategoriesComponent implements OnInit, OnChanges {
  @Input() contest: any;

  constructor(
    private contestsService: ContestsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log(this.contest);
  }

  createCategory() {
    this.contest.categories.unshift(<CategoryModel>{});
  }

  deleteCategory(category: CategoryModel) {
    console.log(category);
    if (category && category._id) {
      console.log(category);
      // Delete category from contest.categories
      this.contest.categories = this.contest.categories.filter(
        (c) => c._id != category._id
      );

      // Delete category from database
      this.categoriesService.delete(category._id).subscribe();
    } else {
      this.contest.categories = this.contest.categories.filter(
        (c) => c._id != undefined
      );
    }
  }
}
