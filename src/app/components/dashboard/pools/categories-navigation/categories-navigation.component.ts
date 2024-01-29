import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'categories-navigation',
  templateUrl: './categories-navigation.component.html',
  styleUrls: ['./categories-navigation.component.scss'],
})
export class CategoriesNavigationComponent {
  @Input() categories: any[] = null;
  @Input() registrations: any[] = null;
  @Input() selectedCategory: CategoryModel;
  @Output() categorySelected = new EventEmitter<CategoryModel>();

  constructor() {}

  getNbRegistrations(categoryId) {
    return this.registrations.filter(
      (registration) => registration.category._id === categoryId
    ).length;
  }

  onCategorySelected(category: CategoryModel) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }
}
