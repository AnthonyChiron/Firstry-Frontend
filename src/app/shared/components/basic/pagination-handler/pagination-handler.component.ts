import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination-handler',
  templateUrl: './pagination-handler.component.html',
  styleUrls: ['./pagination-handler.component.scss'],
})
export class PaginationHandlerComponent {
  @Input() totalPages: number;
  @Input() currentPage: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() {}

  navigateTo(page: number): void {
    this.pageChanged.emit(page);
  }
}
