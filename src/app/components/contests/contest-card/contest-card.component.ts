import { Component, Input } from '@angular/core';

@Component({
  selector: 'contest-card',
  templateUrl: './contest-card.component.html',
  styleUrls: ['./contest-card.component.scss'],
})
export class ContestCardComponent {
  @Input() contest: any;

  constructor() {}
}
