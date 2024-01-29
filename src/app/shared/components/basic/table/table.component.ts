import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() headers: string[] = [];
  @Input() columns: string[] = [];
  @Input() data: any[] = [];

  @Input() sortColumn: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor() {}

  ngOnInit(): void {
    if (this.sortColumn && this.data) {
      this.sortBy(this.sortColumn);
    }
  }

  ngOnChanges() {
    if (this.sortColumn && this.data) {
      this.sortBy(this.sortColumn);
    }
  }

  getObjectKeys(item: any): string[] {
    return Object.keys(item);
  }

  sortBy(column: string): void {
    this.data.sort((a, b) => {
      if (a[column] < b[column]) {
        return -1;
      }
      if (a[column] > b[column]) {
        return 1;
      }
      return 0;
    });
  }
}
