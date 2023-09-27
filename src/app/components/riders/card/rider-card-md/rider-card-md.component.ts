import { Component, Input, OnInit } from '@angular/core';
import { RiderModel } from 'src/app/models/rider.model';

@Component({
  selector: 'rider-card-md',
  templateUrl: './rider-card-md.component.html',
  styleUrls: ['./rider-card-md.component.scss'],
})
export class RiderCardMediumComponent implements OnInit {
  @Input() rider!: RiderModel;
  @Input() heigth: number = 120;
  @Input() width: number = 30;
  @Input() heigthPhoto: number = 105;
  @Input() widthPhoto: number = 20;
  @Input() sample: boolean = false;

  ngOnInit(): void {
    console.log(this.rider);
  }
}
