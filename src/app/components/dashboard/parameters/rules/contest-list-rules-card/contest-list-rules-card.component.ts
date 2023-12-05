import { Component, Input } from '@angular/core';

@Component({
  selector: 'contest-list-rules-card',
  templateUrl: './contest-list-rules-card.component.html',
  styleUrls: ['./contest-list-rules-card.component.scss'],
})
export class ContestListRulesCardComponent {
  @Input() contest: any;
}
