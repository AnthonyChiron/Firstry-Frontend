import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'pagination-handler',
  templateUrl: './pagination-handler.component.html',
  styleUrls: ['./pagination-handler.component.scss'],
})
export class PaginationHandlerComponent implements OnInit, OnChanges {
  @Input() totalPages: number;
  @Input() currentPage: number;
  @Input() pagesToShow: number = 5;
  @Output() pageChanged = new EventEmitter<number>();
  visiblePages: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.calculateVisiblePages();
  }

  ngOnChanges(): void {
    this.calculateVisiblePages();
  }

  private calculateVisiblePages(): void {
    let pages = [];
    let startPage = Math.max(
      this.currentPage - Math.floor(this.pagesToShow / 2),
      1
    );
    let endPage = startPage + this.pagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - this.pagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    this.visiblePages = pages;
  }

  navigateTo(page: number): void {
    this.pageChanged.emit(page);
  }
}
