import { Component, Input, OnInit } from '@angular/core';
import { RiderModel } from 'src/app/models/rider.model';

@Component({
  selector: 'rider-card-md',
  templateUrl: './rider-card-md.component.html',
  styleUrls: ['./rider-card-md.component.scss'],
})
export class RiderCardMediumComponent implements OnInit {
  @Input() rider!: RiderModel;

  ngOnInit(): void {
    console.log(this.rider);
  }
}
