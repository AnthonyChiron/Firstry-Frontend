import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-tag',
  templateUrl: './info-tag.component.html',
  styleUrls: ['./info-tag.component.scss'],
})
export class InfoTagComponent {
  @Input() label: string;
  @Input() icon: string;
}
