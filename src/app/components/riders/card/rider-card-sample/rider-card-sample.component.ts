import { Component, Input, OnInit } from '@angular/core';
import { RiderModel } from 'src/app/models/rider.model';

@Component({
  selector: 'rider-card-sample',
  templateUrl: './rider-card-sample.component.html',
  styleUrls: ['./rider-card-sample.component.scss'],
})
export class RiderCardSampleComponent implements OnInit {
  @Input() rider!: RiderModel;
  @Input() heigth: number = 120;
  @Input() width: number = 30;
  @Input() heigthPhoto: number = 105;
  @Input() widthPhoto: number = 20;

  ngOnInit(): void {
    console.log(this.rider);
  }
}
