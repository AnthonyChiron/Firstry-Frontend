import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'accueil-select-contest-rider-pres',
  templateUrl: './accueil-select-contest-rider-pres.component.html',
  styleUrls: ['./accueil-select-contest-rider-pres.component.scss'],
})
export class AccueilSelectContestRiderPresComponent {
  @Output() selectContest = new EventEmitter();
  @Output() selectRider = new EventEmitter();
  type: string = 'rider';

  select(type) {
    this.type = type;
    if (type === 'rider') {
      this.selectRider.emit();
    } else {
      this.selectContest.emit();
    }
  }
}
