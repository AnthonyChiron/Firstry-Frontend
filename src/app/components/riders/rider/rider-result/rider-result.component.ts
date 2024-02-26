import { formatDate } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PoolsService } from 'src/app/shared/data/PoolsService/pools.service';

@Component({
  selector: 'rider-result',
  templateUrl: './rider-result.component.html',
  styleUrls: ['./rider-result.component.scss'],
})
export class RiderResultComponent implements OnInit, OnChanges {
  @Input() rider: any;
  results: any;

  constructor(private _poolsService: PoolsService) {}

  ngOnInit(): void {
    if (!this.rider) return;
    this._poolsService.getRiderResults(this.rider._id).subscribe((res) => {});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rider && changes.rider.currentValue) {
      this._poolsService
        .getRiderResults(this.rider._id)
        .subscribe((res: any) => {
          this.results = res.map((pool) => {
            return {
              rank: pool.rank,
              contest: pool.contest.name,
              date: pool.steps[0].startDate,
            };
          });
        });
    }
  }
}
