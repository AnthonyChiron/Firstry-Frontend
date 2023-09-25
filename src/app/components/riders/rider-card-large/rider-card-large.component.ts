import { Component, Input } from '@angular/core';
import { RiderModel } from 'src/app/models/rider.model';

@Component({
  selector: 'rider-card-lg',
  templateUrl: './rider-card-large.component.html',
  styleUrls: ['./rider-card-large.component.scss'],
})
export class RiderCardLargeComponent {
  @Input() rider!: RiderModel;

  ngOnInit(): void {
    console.log(this.rider);
  }
}
