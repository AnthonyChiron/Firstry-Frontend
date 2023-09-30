import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RiderModel } from 'src/app/models/rider.model';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';

@Component({
  selector: 'rider-card-lg',
  templateUrl: './rider-card-large.component.html',
  styleUrls: ['./rider-card-large.component.scss'],
})
export class RiderCardLargeComponent implements OnChanges, OnInit {
  @Input() rider!: RiderModel;
  isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    if (this.rider) this.isLoading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rider) {
      if (this.rider) this.isLoading = false;
    }
  }
}
