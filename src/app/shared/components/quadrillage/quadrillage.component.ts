import { Component, Input } from '@angular/core';

@Component({
  selector: 'quadrillage',
  templateUrl: './quadrillage.component.html',
  styleUrls: ['./quadrillage.component.scss'],
})
export class QuadrillageComponent {
  @Input() nbRows: number = 0;
  @Input() nbColumns: number = 0;
  @Input() width: number = 0;
  @Input() height: number = 0;
}
