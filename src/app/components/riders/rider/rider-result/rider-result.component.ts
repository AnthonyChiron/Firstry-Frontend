import { Component, Input } from '@angular/core';

@Component({
  selector: 'rider-result',
  templateUrl: './rider-result.component.html',
  styleUrls: ['./rider-result.component.scss'],
})
export class RiderResultComponent {
  @Input() rider: any;

  constructor() {}
}
