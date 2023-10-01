import { Component, Input, OnInit } from '@angular/core';
import { RiderModel } from 'src/app/models/rider.model';

@Component({
  selector: 'rider-card-md',
  templateUrl: './rider-card-md.component.html',
  styleUrls: ['./rider-card-md.component.scss'],
})
export class RiderCardMediumComponent implements OnInit {
  @Input() rider!: RiderModel;
  @Input() height: number = 13;
  @Input() width: number = 30;
  @Input() widthPhoto: number = 0;
  @Input() sample: boolean = false;

  ngOnInit(): void {
    if (this.widthPhoto == 0) this.widthPhoto = this.width;

    console.log(this.rider);
  }
}
