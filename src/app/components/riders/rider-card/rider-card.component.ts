import { Component, Input, OnInit } from '@angular/core';
import { RiderModel } from 'src/app/models/rider.model';

@Component({
  selector: 'rider-card',
  templateUrl: './rider-card.component.html',
  styleUrls: ['./rider-card.component.scss'],
})
export class RiderCardComponent implements OnInit {
  @Input() rider!: RiderModel;

  ngOnInit(): void {
    console.log(this.rider);
  }
}
