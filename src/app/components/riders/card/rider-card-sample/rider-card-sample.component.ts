import { Component, Input, OnInit } from '@angular/core';
import { RiderModel } from 'src/app/models/rider.model';

@Component({
  selector: 'rider-card-sample',
  templateUrl: './rider-card-sample.component.html',
  styleUrls: ['./rider-card-sample.component.scss'],
})
export class RiderCardSampleComponent implements OnInit {
  @Input() rider!: RiderModel;
  @Input() width: number = 30;
  @Input() height: number = 12;
  @Input() heigthPhoto: number = 105;
  @Input() widthPhoto: number = 20;

  ngOnInit(): void {
    console.log(this.rider);
  }
}
